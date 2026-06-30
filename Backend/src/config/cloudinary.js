import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cleanupLocalFile = (localFilePath) => {
    if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    }
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
        });

        cleanupLocalFile(localFilePath);
        return response.secure_url;
    } catch (error) {
        console.log("CLOUDINARY ERROR:", error);
        cleanupLocalFile(localFilePath);
        return null;
    }
};

const uploadVideoOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const fileSize = fs.statSync(localFilePath).size;
        const uploadOptions = { resource_type: "video" };

        const response =
            fileSize > 20 * 1024 * 1024
                ? await cloudinary.uploader.upload_large(localFilePath, {
                      ...uploadOptions,
                      chunk_size: 6_000_000,
                  })
                : await cloudinary.uploader.upload(localFilePath, uploadOptions);

        cleanupLocalFile(localFilePath);
        return response.secure_url;
    } catch (error) {
        console.log("CLOUDINARY VIDEO ERROR:", error?.message || error);
        cleanupLocalFile(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary, uploadVideoOnCloudinary };
