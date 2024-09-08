import User from '#models/user';
import UserPermission from '#models/user_permission';
import { signInValidator, signUpValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';

export default class AuthController {

    public async SignIn({ request, response }: HttpContext) {
        try {
            const body = request.all();
            const payload = await signInValidator.validate(body);
            const user = await User.query()
                .where({ email: payload.email })
                .preload('permission')
                .firstOrFail();
            if (!user) {
                return response.notFound("Account not found.");
            }
            const verifyPassword = await hash.verify(user.password, payload.password)
            if (!verifyPassword) {
                return response.notFound("Email or password is incorrect.")
            }
            const auth = await User.accessTokens.create(user, ["*"], { expiresIn: "1 day" });
            return response.accepted(auth);
        } catch (error: any) {
            return response.internalServerError({ error: error.message })
        }
    }

    public async SignUp({ request, response }: HttpContext) {
        try {
            const body = request.all();
            const payload = await signUpValidator.validate(body);
            const { roles, ...userData } = payload;
            const user = await User.create(userData);
            await user.related('permission').createMany(
                roles.map((role_id) => ({ role_id }))
            )
            const { password, ...data } = user.toJSON();
            return response.created(data);
        } catch (error: any) {
            return response.internalServerError({ error: error.message });
        }
    }

}