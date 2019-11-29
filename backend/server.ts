import * as jsonServer from 'json-server'
import * as http from 'http'
import {handleAuthentication} from './auth'
import {handleAuthorization} from './authz'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)
server.use(router)

http.createServer(server)
  .listen(3001, () => {
  console.log('JSON Server is running')
})
