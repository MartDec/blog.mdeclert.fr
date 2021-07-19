import Route from '@ioc:Adonis/Core/Route'

Route.get('/admin', 'PageController.render').middleware(['auth:web', 'admin'])

Route.get('/admin/posts', 'PostController.getPosts').middleware(['auth:web', 'admin'])
Route.get('/admin/posts/create', 'PageController.render').middleware(['auth:web', 'admin'])
Route.get('/admin/posts/:id', 'PostController.renderEdit').middleware(['auth:web', 'admin'])

Route.post('/admin/posts/create', 'PostController.create').middleware(['auth:web', 'admin'])
Route.post('/admin/posts/:id', 'PostController.update').middleware(['auth:web', 'admin', 'author'])

Route.get('/admin/users', 'PageController.render').middleware(['auth:web', 'admin'])

Route.get('/admin/profile', 'PageController.render').middleware(['auth:web', 'admin'])
