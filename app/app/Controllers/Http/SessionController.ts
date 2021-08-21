import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterUserValidator from 'App/Validators/RegisterUserValidator'
import User from 'App/Models/User'
import ConnectUserValidator from 'App/Validators/ConnectUserValidator'
import Role from 'App/Models/Role'

export default class SessionController {
  public async register({ auth, session, request, response }: HttpContextContract) {
    if (await User.findBy('email', request.input('email')) === null) {
      const validated = await request.validate(RegisterUserValidator)
      const userDetails = { roleId: Role.ROLE_READER, ...validated }
      const user = await User.createUser(userDetails)

      auth.use('web').login(user)
      session.put('user', user)
      return response.redirect('/')
    }

    session.flash('errors.already-exists', 'Cet email est déjà utilisé')
    return response.redirect().back()
  }

  public async login({ auth, session, request, response }: HttpContextContract) {
    const userDetails = await request.validate(ConnectUserValidator)
    const user = await User.findBy('email', userDetails.email)

    if (user) {
      await user.load('role')
      auth.use('web').login(user)
      session.put('user', user)
      return response.redirect('/')
    }

    session.flash('errors.not-found', 'Utilisateur non trouvé')
    response.redirect().back()
  }

  public async logout({ auth, session, response }: HttpContextContract) {
    await auth.use('web').logout()
    session.forget('user')
    response.redirect('/login')
  }
}
