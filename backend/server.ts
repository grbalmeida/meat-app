import * as jsonServer from 'json-server'
import {Express} from 'express'
import * as fs from 'fs'
import * as https from 'https'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)

const options = {
  cert: fs.readFileSync('../keys/cert.pem'),
  key: fs.readFileSync('../keys/key.pem')
}

https.createServer(options, server)
  .listen(3001, () => {
  console.log('JSON Server is running')
})