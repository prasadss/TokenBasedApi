const express = require('express')
const user = require('../routes/userRoutes')
const auth = require('../middleware/auth')

//Concatenating all the routes and middleware
module.exports = function(app) {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api/user/', auth, user)
}
