import Application from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Post from 'App/Models/Post'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';
import CreatePostValidator from 'App/Validators/CreatePostValidator'

export default class PostController {
  public async create({ session, request, response }: HttpContextContract) {
    const validated = await request.validate(CreatePostValidator)
    const thumbnail = request.file('thumbnail')
    const thumbnailPath = await this.uploadFile(thumbnail)
    const postBody = {
      userId: session.get('user').id,
      thumbnail: thumbnailPath,
      title: validated.title,
      content: validated.content
    }
    const post = await Post.create(postBody)

    response.redirect().toRoute('PostController.renderEdit', { id: post.id })
  }

  public async getPosts({ request, view }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 10
    const posts = await Database.from('posts').paginate(page, limit)
    let domain = "client"

    posts.baseUrl('/posts')
    if (this.isAdminRequest(request.url())) {
      domain = 'admin'
      posts.baseUrl('/admin/posts')
    }

    return view.render(`${domain}::posts`, { posts })
  }

  public async update({ request, response }: HttpContextContract) {
    const thumbnail = request.file('thumbnail')
    return response.json({ error: false, thumbnail })
  }

  public async renderEdit({ request, view }: HttpContextContract) {
    const post = await Post.find(request.param('id'))
    return view.render('admin::posts/edit', { post })
  }

  protected isAdminRequest(requestUri: string) {
    return requestUri.indexOf('/admin') === 0
  }

  protected async uploadFile(file: MultipartFileContract | null): Promise<string | undefined> {
    if (file) {
      const targetPath = Application.publicPath('uploads')
      await file.move(targetPath)
      return `/uploads/${file.clientName}`
    }

    return undefined
  }
}
