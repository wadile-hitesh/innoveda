"use client"
import Image from "next/image";
import { Input } from "./ui/input";
import { useRef } from "react";

import { toast } from "sonner";

interface UploadVideoProps {
  onUploadComplete : (url : string) => void,
  className : string
  setLoading : (value : boolean) => void,
  setData: (value: {
    publicId : string,
    originalSize : string,
    compressedSize : string
  }) => void;
}

export default function CloudinaryUploadVideo({onUploadComplete,className, setLoading,setData} : UploadVideoProps){
    
    
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleClick = ()=>{
            fileInputRef.current?.click()
        } 

        const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if(!file) return;
            setLoading(true);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("originalSize", file.size.toString());

            try {
                const response = await fetch("/api/video-upload", {
                    method: "POST",
                    body: formData
                })

                if(!response.ok) throw new Error("Failed to upload video");

                const data = await response.json();
                
                onUploadComplete(data.publicId);
                setData(data)
                
                toast.success("Video Uploaded")

            } catch (error) {
                if (error instanceof Error){
                    toast.error("Failed to upload Video");
                }
            } finally{
                setLoading(false);
            }
        };
    
    return (
    <div className={`flex flex-col items-center p-4 ${className}`}>
      <div className="w-5/7 h-full ">
          <div className="h-full rounded-md bg-gray-800 p-6" onClick={handleClick}>
            <Input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              ref={fileInputRef}
                accept="video/*"
            />
            <div className="border-1 border-gray-600 h-full rounded-md">
              <div className="flex flex-col items-center justify-center h-full">
                <Image 
                  src="/images/upload-image.svg"
                  alt="Video Upload"
                  width={200}
                  height={200}
                  className=""
                />
                <p className="text-white font-mono text-xl">
                  Drop an Video or click, <span className="text-orange-400">here</span>
                </p>
              </div>
            </div>
          </div>   
      </div>
    </div>
    )
}
