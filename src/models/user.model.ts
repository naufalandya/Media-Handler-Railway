import { uuidv7 } from "uuidv7";
import prisma from "../config/db";
import { Users } from "@prisma/client";


type UserCreate = {
    username:string,
    email: string,
    password: string,
}

export const createUser = async function(username : string, email : string, password: string) :Promise<UserCreate | object | boolean> {

    const id = uuidv7()
    
    const argonHash = await Bun.password.hash(password, {
        algorithm: "argon2id", 
        memoryCost: 4, 
        timeCost: 3,
      });

    try {
        const user = await prisma.users.create({

            data : {
                id: id,
                username:username,
                email: email,
                password: argonHash,
                created_at : new Date().toString()
            }

        });
        
        return user

    } catch (err) {
        //console.error(err);
        return false
    }
}

export const getUsers = async function():Promise<Users[] | null> {
    try {
        const users = await prisma.users.findMany({
            take:100
        })

        return users
        
    } catch (error){
        console.log(error)
        return null
    }
}


export const checkUserByEmail = async function(email : any):Promise<boolean | null> {
    try {

        console.log("hai")

        let user
        if(email) {
            user = await prisma.users.findFirst({
                where: {
                    email: {
                        equals: email
                    }
                }
            });            
        }

        if(!user){
            return null
        }
        
        return true
        
    } catch (error){
        console.log(error)
        return null
    }
}


export const getUserByEmail = async function(email : any):Promise<Users | undefined> {
    try {
        const user = await prisma.users.findUnique({
            where: email
        })

        if(!user){
            return undefined
        }
        console.log(user)

        return user

        
    } catch (error){
        //throw error
    }
}

