const request = require('supertest')
const { User } = require('../../../models/user')
let server
describe('Auth Middleware', () => {
  let token
  const exec = () => {
    return request(server)
      .get('/api/user/getlist')
      .send({ name: 'genres1' })
      .query({ token: token })
  }
  beforeEach(() => {
    server = require('../../../index')
  })
  afterEach(async () => {
    await server.close()
  })
  it('200 if valid token', async () => {
    token = '124'
    const res = await exec()
    expect(res.status).toBe(200)
  })
  it('401 if no token', async () => {
    token = ''
    const res = await exec()
    expect(res.status).toBe(401)
  })
})
