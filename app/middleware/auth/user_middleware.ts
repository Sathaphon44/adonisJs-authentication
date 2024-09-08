import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

const USER = 2

export default class UserMiddleware {
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
    const checkRole = userDetail.permission.find((p: any) => p.roleId == USER)
    if (checkRole) {
      return next()
    }
    return response.unauthorized("Unauthorized access");
  }
}