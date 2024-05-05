import { Hono } from "hono";
import { imageKitRoute, mediaRoute} from "../routes";

const v1Route = new Hono()
v1Route.route("/upload", mediaRoute)
v1Route.route("/image-kit", imageKitRoute)

export default v1Route