import { imageKitController } from "../controllers"
import { Hono } from "hono"

const imagekit = new Hono()

imagekit.get("/auth", (c) => imageKitController.getCredentials(c))

export default imagekit