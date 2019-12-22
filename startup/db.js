const mongoose = require('mongoose')

module.exports = function() {
  mongoose
    .connect(process.env.MONGOURL || 'mongodb://52.31.106.254/TestDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`connected to mongodb`))
}
