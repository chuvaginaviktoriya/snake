/* eslint-disable handle-callback-err */

const express = require('express')
const server = express()
const fs = require('fs')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const { createBundleRenderer } = require('vue-server-renderer')

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template: fs.readFileSync('./index.html', 'utf-8')
  }))
}

let renderer
server.get('/', (req, res) => {
  const context = {
    title: 'Vue JS - Server Render',
    url: req.url
  }
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  renderer = createRenderer(bundle, {
    clientManifest
  })

  renderer.renderToString(context, function (err, html) {
    if (err) {
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
    }
  })
})

server.use('/dist', express.static('dist'))
server.listen(3000)
