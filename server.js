/* eslint-disable handle-callback-err */

const express = require('express')
const server = express()
const fs = require('fs')
const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.html', 'utf-8')
})
const bundle = require('./dist/server.bundle.js')
// server.use(express.static(__dirname + '/dist/css'))

server.get('*', (req, res) => {
  bundle.default({ url: req.url }).then((app) => {
    const context = {
      title: 'Vue JS - Server Render',
      meta: `
                <meta description="vuejs server side render">
            `
    }

    renderer.renderToString(app, context, function (err, html) {
      console.log()
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
})

server.listen(3000)
