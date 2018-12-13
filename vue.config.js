const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  configureWebpack: () => ({
    target: 'node',
    entry: {
      app: './src/entry-server.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
      whitelist: /\.css$/
    })
  }),
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
  }
}
