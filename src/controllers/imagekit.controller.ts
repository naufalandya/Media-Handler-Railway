import { Context } from "hono"
import imagekit from "../libs/imagekit.lib"

export const getCredentials = async function(c : Context) {
    try {
        const credential = imagekit.getAuthenticationParameters()
        return c.json({
            status : true,
            message : 'success',
            data : credential
        }, 200)
    } catch (err) {
        return c.json({
            status : false,
            message : 'invalid'
        }, 404)
    }
}

export const deleteImage = async function(file_id : string, c : Context) {
    try {
        const id = imagekit.deleteFile(file_id, (error, result) => {
            if(!error) {
                return c.json({
                    status: true,
                    message : 'success',
                    data : `image with id ${file_id} has been deleted`
                }, 200)
            } else {
                return c.json({
                    error : {
                    status: false,
                    message : `error ${error}`,
                }}, 400)
            }
        })
    } catch (error) {
        return c.json({
            error : {
            status: false,
            message : `Unexpected Error ${error}`,
        }}, 500)
    }
}