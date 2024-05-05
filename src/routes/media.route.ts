import { Hono } from "hono";
import { bodyLimit } from 'hono/body-limit'
import { imageController} from "../controllers/media.controller";


const upload = new Hono();

upload.post("/image",


    bodyLimit({
        maxSize: 100 * 1024,
        onError: (c) => {
        return c.json({
            status : false,
            message: 'invalid Data Overflow More Than 100KB'
        }, 413)
        },
    }),

    async (c) => await imageController(c),
)

export default upload

//zod validator entah kenapa tidak bekerja pada file sehingga saya buat validator sendiri :')
// zValidator("form", z.object({
//     image: z.any().refine((files) => { 
//         if(files?.size >= MAX_FILE_SIZE){
//             console.log(files)
//             return "Max image size is 5MB"
//         }
//         console.log(files)
//     }
//     )
//       .refine(
//         (files) => {
//             const isMatch = ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type)
//             console.log(isMatch)
//             if (!ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type)) {
//                 console.log(files.type)
//                 return "Only .jpg, .jpeg, .png, and .webp formats are supported."
//             }
//             console.log(files.type)
//         }
//       )
//     }), (result, c) => {
//         console.log(result)
//     }
// )