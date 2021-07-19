import View from '@ioc:Adonis/Core/View'
import Application from '@ioc:Adonis/Core/Application'

View.global('currentUser', (session) => {
  if (session.has('user'))
    return session.get('user')

  return {}
})

View.global('currentUserName', (session) => {
  if (session.has('user'))
    return session.get('user.username')

  return false
})

View.global('currentUserIsAdmin', (session) => {
  if (session.has('user'))
    return session.get('user.role.name') === 'admin'

    return false
})

View.mount('client', Application.resourcesPath('views/client'))
View.mount('admin', Application.resourcesPath('views/admin'))