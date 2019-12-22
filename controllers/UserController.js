const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const async = require('async')

const User = userModel.User

findUser = (email, callback) => {
  //get user based on email
  User.findOne({ email: email })
    .then((user) => {
      callback(null, user)
    })
    .catch((error) => {
      console.log(error)

      callback({ error: error })
    })
}
module.exports.getUser = async (req, res) => {
  const user = await User.find({})
  if (!user || user.length === 0) return res.status(401).send('no user found')
  res.send(user)
}

module.exports.create = (req, res) => {
  const { error } = userModel.validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  async.auto(
    {
      find_user: function(callback) {
        findUser(req.body.email, callback)
      },
      create_salt: function(callback) {
        bcrypt
          .genSalt(10)
          .then((salt) => {
            callback(null, salt)
          })
          .catch((error) => {
            callback({ error: error })
          })
      },
      encrypt_pass: [
        'find_user',
        'create_salt',
        function(result, callback) {
          if (result.find_user) {
            callback({ status: 400, message: 'User already exists' })
          } else {
            const password = bcrypt.hashSync(req.body.password, result.create_salt)
            callback(null, password)
          }
        },
      ],
      create_user: [
        'encrypt_pass',
        function(result, callback) {
          if (!result.encrypt_pass) {
            callback({ status: 400, message: 'User already exists' })
          } else {
            let user = new User({
              name: req.body.name,
              email: req.body.email,
              password: result.encrypt_pass,
            })
            user
              .save()
              .then((user) => {
                callback(null, { message: 'User create successfully', user })
              })
              .catch((error) => {
                callback({ status: 400, message: 'User Creation failed', error })
              })
          }
        },
      ],
    },
    function(error, results) {
      if (error) return res.status(error.status).send(error.message)
      if (results) return res.send(results.create_user.message)
    }
  )
}
