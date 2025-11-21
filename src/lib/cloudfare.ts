"use server"
import {DeleteObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

//validar variables de entorno|

//const R2_BUCKET = process.env.R2_BUCKET;


//Cliente de S3
const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_ENDPOINT!,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
    },
});
    
export const uploadFile = async (file: Uint8Array, fileName: string): Promise<string> => {
    const uploadParams = {
        Bucket: process.env.R2_BUCKET,
        Key: fileName,
        Body: file,
    };
    const command = new PutObjectCommand(uploadParams);
    await s3.send(command);
    const endpoint = process.env.CLOUDFLARE_ENDPOINT!;
    const publicBaseUrl = process.env.CLOUDFLARE_PUBLIC_BASE_URL
        ? process.env.CLOUDFLARE_PUBLIC_BASE_URL.replace(/\/$/, "")
        : `https://${process.env.R2_BUCKET}.${endpoint.replace(/^https?:\/\//, "")}`;

    return `${publicBaseUrl}/${fileName}`;
};

export const deleteFile = async (fileName: string) => {
    const deleteParams = {
        Bucket: process.env.R2_BUCKET,
        Key: fileName,
    };
    const command = new DeleteObjectCommand(deleteParams);
    await s3.send(command);
};
