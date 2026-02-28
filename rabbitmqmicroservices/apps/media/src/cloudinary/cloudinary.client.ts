import { v2 as cloudinary } from "cloudinary";


export function initCloudinary() {
    const cloudName = process.env.CLAUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLAUDINARY_API_KEY;
    const apiSecret = process.env.CLAUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
        throw new Error("Cloudinary configuration is missing. Please set the environment variables.");
    }

    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });


    return cloudinary;
}


