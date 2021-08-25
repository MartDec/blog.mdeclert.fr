import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'PageController.render')
Route.get('/posts', 'PostController.getPosts')
Route.get('/login', 'PageController.render').middleware('guest')
Route.get('/me', 'PageController.render').middleware('auth:web')

Route.post('/register', 'SessionController.register')
Route.post('/login', 'SessionController.login')

Route.get('/logout', 'SessionController.logout').middleware('auth:web')