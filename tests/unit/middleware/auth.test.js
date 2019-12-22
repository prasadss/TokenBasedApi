const { User } = require('../../../models/user')
const auth = require('../../../middleware/auth')
const mongoose = require('mongoose')
const mockRequest = () => {
  return {
    query: {},
  }
}
const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.send = jest.fn().mockReturnValue(res)
  return res
}
describe('auth middleware', () => {
  it('check if token exists', () => {
    const req = mockRequest()
    const res = mockResponse()
    const next = jest.fn()

    auth(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
  })
})
