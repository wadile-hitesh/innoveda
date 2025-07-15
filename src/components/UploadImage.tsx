"use client"
import Image from "next/image";
import { Input } from "./ui/input";
import { useRef } from "react";
import authenticator from "@/lib/imagekitAuthenticator";

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { toast } from "sonner";

interface UploadImageProps {
  onUploadComplete : (url : string) => void,
  className : string
}

export default function UploadImage({onUploadComplete,className} : UploadImageProps){
    
    
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = ()=>{
        fileInputRef.current?.click()
    } 

    
      
    const abortController = new AbortController();
    
    
        const handleFileChange = async ()=>{
          const fileInput = fileInputRef?.current
          if(!fileInput || !fileInput.files || fileInput.files.length === 0){
            return Response.json("File is Required")
          }
    
          const file = fileInput.files[0]
    
          let authParams;
    
          try {
            authParams = await authenticator() 
          } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
          }
    
          const {token, expire, signature, publicKey} = authParams
    
          try{
              const uploadResponse = await upload({
                signature,
                publicKey,
                file,
                fileName: file.name,
                abortSignal: abortController.signal,
                token: token,
                expire: expire
              });
              
              onUploadComplete(uploadResponse.url as string)
              toast.success("Image Uploaded")

            } catch (error) {
                  if (error instanceof ImageKitAbortError) {
                      console.error("Upload aborted:", error.reason);
                  } else if (error instanceof ImageKitInvalidRequestError) {
                      console.error("Invalid request:", error.message);
                  } else if (error instanceof ImageKitUploadNetworkError) {
                      console.error("Network error:", error.message);
                  } else if (error instanceof ImageKitServerError) {
                      console.error("Server error:", error.message);
                  } else {
                      console.error("Upload error:", error);
                  }
              }
    
    }
    return (
    <div className={`flex flex-col items-center p-4 ${className}`}>
      <div className="w-5/7 h-full ">
          <div className="h-full rounded-md bg-gray-800 p-6" onClick={handleClick}>
            <Input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
              accept=".png, .jpg, .jpeg, .webp, .svg"
            />
            <div className="border-1 border-gray-600 h-full rounded-md">
              <div className="flex flex-col items-center justify-center h-full">
                <Image 
                  src="/images/upload-image.svg"
                  alt="Upload Image"
                  width={200}
                  height={200}
                  className=""
                />
                <p className="text-white font-mono text-xl">
                  Drop an image or click, <span className="text-orange-400">here</span>
                </p>
              </div>
            </div>
          </div>   
      </div>
    </div>
    )
}
