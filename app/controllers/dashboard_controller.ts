import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {

  async index({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate();
    return response.send(`welcome to ${user.username}.`)
  }

}