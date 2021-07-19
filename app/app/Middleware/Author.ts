import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class Author {
  public async handle({ request, session, response }: HttpContextContract, next: () => Promise<void>) {
    const post = await Post.find(request.param('id'))
    if (post?.userId === session.get('user').id)
      return next()

    return response.unauthorized({ error: 'Vous devez être le créateur de cet article' })
  }
}
