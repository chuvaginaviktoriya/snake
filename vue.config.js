const path = require('path')

module.exports = {
  baseUrl: (process.env.NODE_ENV == 'production') 
    ? path.resolve(__dirname, './dist')
    : '/'
}
