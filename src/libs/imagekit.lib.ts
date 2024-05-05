import ImageKit = require("imagekit");

export const PUBLIC_KEY =  String(process.env.IMAGEKIT_PUBLIC_KEY)
export const PRIVATE_KEY = String(process.env.IMAGEKIT_PRIVATE_KEY)
export const ENDPOINT = String(process.env.IMAGEKIT_ENDPOINT)

const imagekit = new ImageKit({
    publicKey : PUBLIC_KEY,
    privateKey : PRIVATE_KEY,
    urlEndpoint : ENDPOINT
})

export default imagekit



