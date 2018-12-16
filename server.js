/* eslint-disable handle-callback-err */

const express = require('express')
const server = express()
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const isProd = process.env.NODE_ENV === 'production'

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    template: fs.readFileSync('./index.html', 'utf-8')
  }))
}

let renderer
let readyPromise

if (isProd) {
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  renderer = createRenderer(bundle, {
    clientManifest
  })
} else {
  readyPromise = require('./build/setup-dev-server')(server, (bundle, options) => {
    renderer = createRenderer(bundle, options)
  })
}

function render (req, res) {
  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url
  }
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
}
server.use('/dist', express.static('dist'))

server.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

server.listen(8080)
