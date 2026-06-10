import { cloudinary } from "../config/cloudinary";

/*
Upload an image buffer to Cloudinary.
Input: Buffer, folder name.
Output: Cloudinary upload result with secure_url and public_id.
*/
export const uploadImage = async (buffer: Buffer, folder: string) => {
    return new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

/*
Upload a PDF file buffer to Cloudinary.
Input: Buffer, folder name.
Output: Cloudinary upload result with secure_url and public_id.
*/
export const uploadPdf = async (buffer: Buffer, folder: string) => {
    return new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "raw",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

/*
Delete a file from Cloudinary by public_id.
Input: public_id string, resource type ("image" or "raw").
Output: Cloudinary deletion result.
*/
export const deleteCloudinaryFile = async (publicId: string, resourceType: "image" | "raw" = "image") => {
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};
