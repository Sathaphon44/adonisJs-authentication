import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserMiddleware {
  async handle(
    { response, auth }: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {},
  ) {
    const userAuth = await auth.authenticateUsing(options.guards)
    return next()
    // if (userAuth.role == "USER") {
    //   return next()
    // }
    // return response.unauthorized("Unauthorized");
  }
}