import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

const ADMIN = 1;

export default class AdminMiddleware {
  async handle(
    { response, auth }: HttpContext,
    next: NextFn,
  ) {
    const authUser = await auth.authenticate()
    const user = await User.query()
      .where({ id: authUser.id })
      .preload('permission')
      .firstOrFail();
    const userDetail = user.toJSON();
    const checkRole = userDetail.permission.find((p: any) => p.roleId == ADMIN);
    if (checkRole) {
      return next()
    }
    return response.unauthorized("Unauthorized access");
  }
}