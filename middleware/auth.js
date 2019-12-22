function auth(req, res, next) {
  //   const token = req.header('x-auth-token')
  const token = req.query.token
  if (!token) return res.status(401).send('Access denied. No Token')
  try {
    //code to verify token
    next()
  } catch (error) {
    res.status(400).send('invalid token')
  }
}
module.exports = auth
