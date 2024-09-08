import User from '#models/user';
import UserPermission from '#models/user_permission';
import { signInValidator, signUpValidator } from '#validators/auth';
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash';

export default class AuthController {

    public async SignIn({ request, response }: HttpContext) {
        const body = request.all();
        const payload = await signInValidator.validate(body);
        const user = await User.query()
            .where({ email: payload.email })
            .preload('permission')
            .firstOrFail();
        if (!user) {
            return response.notFound("Account not found.");
        }
        console.log(user.toJSON());
        const verifyPassword = await hash.verify(user.password, payload.password)
        if (!verifyPassword) {
            return response.notFound("Email or password is incorrect.")
        }
        const auth = await User.accessTokens.create(user, ["*"], { expiresIn: "1 day" });
        return response.accepted(auth);
    }

    public async SignUp({ request, response }: HttpContext) {
        const body = request.all();
        const payload = await signUpValidator.validate(body);
        payload.password = await hash.make(payload.password);
        const { roles, ...userData } = payload;
        const user = await User.create(userData);
        const userPermissions = roles.map((id) => ({ user_id: user.id, role_id: id }))
        await UserPermission.createMany(userPermissions);
        const { password, ...data } = user.toJSON();
        return response.created(data);
    }

}