import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { etag } from 'hono/etag'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { trimTrailingSlash } from 'hono/trailing-slash'
import { secureHeaders } from 'hono/secure-headers'
import v1Route from './api/v1'

const app = new Hono({ strict: true })
// ngelompokkin routing jadi /api/v1 awalannya

const PORT = Bun.env.PORT

app.use('/*', async (c, next) => {
  const corsMiddleware = cors({
    origin: "https://f5b42b21.photo-management-system.pages.dev",
    allowHeaders: ['Origin', 'Content-Type', 'Authorization'],
    allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
  return await corsMiddleware(c, next)
})

app.use(secureHeaders())
app.use("*", etag(), logger(), prettyJSON())

// prettyJSON 
// di endpoint paling ujung kasih ?pretty, ex : www.waduh.com/api/v1/users?pretty
// ntar jadi rapih response json-nya 

// logger
// buat ngecek lalu lintasnya sama ms nya berapa




app.route("/api/v1", v1Route)




app.use(trimTrailingSlash())
//www.waduh.com/api/v1/users/ 
//ke
//www.waduh.com/api/v1/users


app.get('/haha', (c) => {
  return c.json({
    message : "Hello Andya"
  }, 200)// langsung kasih status code disini
})

app.notFound((c) => {
  return c.json({
    status : false,
    message : "Page is not found"
  }, 404)
})

app.use('*', async (c, next) => {
  await next()
  if (c.error) {
    c.json({
      message: "ahh"
    }, 500)
  }
})

export default {
  port: PORT, //port dari env
  fetch:app.fetch, // buat ngejalanin,
  info: console.log(`Server is running on Port ${PORT}`), //sengaja naro, biar ngasih tau kalo jalan :3
  //variabel info bukan dari doc resmi, ini ngide aja naro eh work
}
