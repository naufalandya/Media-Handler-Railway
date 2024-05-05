import { Hono } from "hono";
import { userController } from "../controllers";
import { bodyLimit } from 'hono/body-limit'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const users = new Hono()

users
    .get("/demo", async (c) => userController.demoControllerUsers(c))
    .get("/", (c)=> userController.getAllUsers(c) )
    
    .post("/", 
    zValidator('json', z.object({
        email : z.string().max(80),
        username : z.string().max(80),
        password : z.string().max(80)
    }), (result, c) => {
        if(!result.success) {
            return c.json({
                error : {
                    status: false,
                    message: result.error
                }
            }, 400)
        }
    }
    ),
    bodyLimit({
        maxSize: 1 * 1024,
        onError: (c) => {
          return c.json({
            status : false,
            message: 'invalid Data Overflow More Than 1KB'
          }, 413)
        },
      }),
      (c)=> userController.createUser(c))

export default users