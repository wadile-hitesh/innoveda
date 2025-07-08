import {getUploadAuthParams} from "@imagekit/next/server"
import { NextResponse } from "next/server"

export async function GET(){
    const expireTime = Math.floor(Date.now() / 1000) + 60 * 5;
    
    try {
        const {token, expire, signature} = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        expire : expireTime,
        token : process.env.IMAGEKIT_TOKEN as string
    })

    return NextResponse.json({token, expire, signature, publicKey : process.env.IMAGEKIT_PUBLIC_KEY as string})
    } catch (error: unknown) {
        if(error instanceof Error){
            console.error("Imagekit Authentication Failed : ", error.message)
        }
        else{
            console.error("Unknown Imagekit Error ",error)
        }
    }
    
}

