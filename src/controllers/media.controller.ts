import { Context } from "hono";
import { imageValidatorSingle } from "../middleware/image-validator";
import imagekit from "../libs/imagekit.lib";

export const imageController =async function(c : Context) {
    
    try {
    const {image} = await c.req.parseBody()

    if (!(image instanceof File)) return c.json({
        message : "Masukkan File dan Key"
    }, 400);
    
    const valid = imageValidatorSingle(image);

    switch(valid){
        case 1:
            return c.json( {error : {
                status:false,
                message: "hanya menerima png, jpg, dan gif"
            }
        })

        case 2:
            return c.json( {error : {
                status:false,
                message: "tipe file tidak diterima"
            }
        }) 

        default:

            const extension = image.name.split('.').pop() 

           
      
                const imageToArrayBuffer = await image.arrayBuffer();
                const imageToBuffer = Buffer.from(imageToArrayBuffer);

                //hasil string base64 disini bisa balik lagi jadi foto pake online decoder
                //sehingga kemungkinan yang bisa disimpulkan imagekit belom support Bun Runtime 
                const imageToBase64 : string = imageToBuffer.toString("base64");

                //gabisa promise pending terus
                await imagekit.upload({
                    fileName: Date.now() + " " + extension,
                    file: imageToBase64
                }).then( (data) => {
                    return c.json({data})
                });

                //gabisa juga
                // const body = {
                //     file: imageToArrayBuffer,
                //     publicKey: PUBLIC_KEY,
                //     signature: result.signature,
                //     expire: result.expire,
                //     token: result.token,
                //     fileName: Date.now() + "." + extension,
                // };

                // const response = await axios.post(
                // 'https://upload.imagekit.io/api/v2/files/upload', 
                // body, 
                // { headers: {'Content-Type': 'multipart/form-data'} }
                // );

                return c.json({message : "Promise pending tidak berhenti"})
            
        } 

    } catch (err) {
        return c.json({
            error : {
                message : err
            }
        }, 500)
    }
} 


