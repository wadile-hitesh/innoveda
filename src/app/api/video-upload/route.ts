import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number
}

export async function POST(request: NextRequest) {


    try {

    if(
        !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
        !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ){
        return NextResponse.json({error: "Cloudinary credentials not found"}, {status: 500})
    }


        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        
        const originalSize = formData.get("originalSize") as string;

        if(!file){
            return NextResponse.json({error: "File not found"}, {status: 400})
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: "video",
                        folder: "video-uploads",
                        transformation: [
                            {quality: "auto", fetch_format: "mp4"},
                        ]
                    },
                    (error, result) => {
                        if(error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer)
            }
        )
        
        return NextResponse.json({publicId : result.public_id, originalSize : originalSize,compressedSize : String(result.bytes)})

    } catch (error) {
        if(error instanceof Error)
            return NextResponse.json({error: "UPload video failed"}, {status: 500})
    } 

}