import test from 'japa'
import { JSDOM } from 'jsdom'
import supertest from 'supertest'
import User from 'App/Models/User'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Welcome', () => {
  test('ensure home page works', async (assert) => {
    /**
     * Make request
     */
    const { text } = await supertest(BASE_URL).get('/').expect(200)
    /**
     * Construct JSDOM instance using the response HTML
     */
    const { document } = new JSDOM(text).window
    const title = document.querySelector('.title')
    assert.exists(title)
    assert.equal(title!.textContent!.trim(), 'It Works!')
  })

  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.email = 'example@mail.com'
    user.password = 'secret'
    await user.save()
    assert.notEqual(user.password, 'secret')
  })
})