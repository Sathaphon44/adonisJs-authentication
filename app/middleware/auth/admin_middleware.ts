import { Authenticators } from '@adonisjs/auth/types'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(
    { response, auth }: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {},
  ) {
    const user = await auth.authenticate()
    console.log(await user.load('permission'))
    return next()
    // if (userAuth.role == "ADMIN") {
    //   return next()
    // }
    // return response.unauthorized("Unauthorized");
  }
}