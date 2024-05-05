const ACCEPTED_MIME_TYPES = ["image/gif", "image/jpeg", "image/png"];
const MAX_FILE_SIZE_MB = 1; 
const MB_BYTES = 1000000; 

export const imageValidatorSingle = function(image: File) {

    const type = image.type;
    const sizeInMB = image.size / MB_BYTES;


    if (!ACCEPTED_MIME_TYPES.includes(type)) {
        console.log("tipe file tidak diterima")
        return 1
    }
    if (sizeInMB > MAX_FILE_SIZE_MB) {
        console.log(`Ukuran file terlalu besar. Maksimum ${MAX_FILE_SIZE_MB} MB.`)
        return 2
    }
    
    return 3;
};
