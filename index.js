const express = require('express')
const app = express()

require('./startup/routes')(app)
require('./startup/db')()

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => console.log(`Listening Port ${PORT}`))

process.on('uncaughtException', (err, origin) => {
  //code to log uncaught exception
  process.exit(1)
})

module.exports = server
