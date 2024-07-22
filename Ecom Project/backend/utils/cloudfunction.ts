import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_OPTIONS } from './cloudinary';

cloudinary.config(CLOUDINARY_OPTIONS);

export const uploadImage = async(imagePath: string,folder="Ecommerce") =>{
    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        folder,
    }
    const result = await cloudinary.uploader.upload(imagePath,options);
    return result;
}