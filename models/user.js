const mongoose = require('mongoose')
const Joi = require('joi')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
})

const User = mongoose.model('User', UserSchema)

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required(),
  }
  return Joi.validate(user, schema)
}
module.exports.User = User
module.exports.validateUser = validateUser
