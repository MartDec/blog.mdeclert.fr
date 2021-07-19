import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PageController {
  public async render({ view, request }: HttpContextContract) {
    const segments = this.getUrlSegments(request.url())
    const isAdmin = segments[0] === 'admin'
    if (isAdmin) segments.shift()
    const domain = isAdmin ? 'admin' : 'client'
    const pageName = this.getPageName(segments)

    return view.render(`${domain}::${pageName}`)
  }

  protected getPageName(urlSegments: Array<string>): string {
    if (urlSegments.length === 0)
      return 'home'

    return urlSegments.join('/')
  }

  protected getUrlSegments(url: string): Array<string> {
    const segmentsUnfiltered = url.split('/')
    const segments = segmentsUnfiltered.filter((element) => {
      return element !== ''
    })

    return segments
  }
}
