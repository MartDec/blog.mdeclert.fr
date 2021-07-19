import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'

export default class Admin {
  public async handle({ session, response }: HttpContextContract, next: () => Promise<void>) {
    const user = await User.find(session.get('user.id'))
    if (user) {
      await user.load('role')
      if (user.role.id === Role.ROLE_ADMIN)
        return await next()
    }

    response.unauthorized('Cette page est indisponible')
    response.redirect('/')
  }
}
