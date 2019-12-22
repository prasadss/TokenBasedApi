const request = require('supertest')
const mongoose = require('mongoose')
const { User } = require('../../../models/user')
let server
describe('/api/user', () => {
  beforeEach(() => {
    server = require('../../../index')
  })
  afterEach(async () => {
    await User.deleteMany({ email: /test/ })
    await server.close()
  })

  describe('GET /', () => {
    it('Get User List', async () => {
      await User.insertMany([
        { name: 'name1', email: 'test1@test.com', password: 'test2' },
        { name: 'name2', email: 'test2@test.com', password: 'test2' },
      ])
      const res = await request(server).get('/api/user/getlist?token="test"')
      expect(res.status).toBe(200)
      expect(res.body.some((x) => x.name === 'name1')).toBeTruthy()
    })
  })

  describe('POST /', () => {
    it('should return 401 if not logged in', async () => {
      const res = await request(server)
        .post('/api/user/create')
        .send({ name: 'name1', email: 'test1@test.com', password: 'test2' })
      expect(res.status).toBe(401)
    })
    it('should return 400 if invalid data', async () => {
      const res = await request(server)
        .post('/api/user/create?token="test"')
        .send({ name: 'na' })
      expect(res.status).toBe(400)
    })
    it('should save the user if valid', async () => {
      const res = await request(server)
        .post('/api/user/create?token="test"')
        .send({ name: 'name1', email: 'test1@test.com', password: 'test2' })
      expect(res.status).toBe(200)
    })
  })
})
