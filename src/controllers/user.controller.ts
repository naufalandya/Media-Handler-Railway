import { Context } from "hono";
import { HandlerResponse } from "hono/types";
import { userModel } from "../models";


export const demoControllerUsers = function(c : Context) : HandlerResponse<any> {
 
    const data = {
        name : "Andya",
        age : 21,
        university : "gunadarma"
    }

    return c.json({
        status: true,
        message: 'success',
        data: data
    }, 200)

}

export const getAllUsers = async function(c: Context){
    const users = await userModel.getUsers()
    return c.json({
        status: true,
        total: users?.length, 
        message: 'success',
        data: users
    }, 200)
}

export const createUser = async function(c: Context) {

    try {
    const {username, email, password} = await c.req.json()
    
    const user = await userModel.createUser(username, email, password)

    if(!user) {
        return c.json({
            status: false,
            message: 'username or email already exist',
        }, 404)
    }

    return c.json({
        status: true,
        message: 'success',
        data: user

    }, 200)

    } catch (err){
        console.error(err);
    } 
}
