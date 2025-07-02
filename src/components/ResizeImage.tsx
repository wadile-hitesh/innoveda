import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useRef, useState } from "react";

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";


export default function ResizeImage(){

  const [file, setFile] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = ()=>{
    fileInputRef.current?.click()
  }

  const authenticator = async () => {
        try {
            const response = await fetch("/api/upload-auth");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };
  
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

          console.log(uploadResponse)
          setFile(uploadResponse.url as string)
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
    <div className="w-full flex gap-10 p-4 h-full">
      <div className="w-5/7 h-full ">
        {
          file ? 
          (
            <Image 
              src={file} 
              alt="Image"
              width={500}
              height={500}
            />
          )
          :
          (
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
          )
        }
      </div>
      <div className="w-2/7 h-full px-3">
        <div className="flex flex-col h-full justify-between ">
          <div className="flex flex-col gap-10">
            <div className="bg-gray-800 grid grid-cols-3 w-full gap-2 p-1 text-gray-300 font-bold text-sm rounded-md">
              <div className="hover:bg-gray-900 rounded-md py-2 text-center">Pixel</div>
              <div className="hover:bg-gray-900 rounded-md py-2 text-center">Percentage</div>
              <div className="hover:bg-gray-900 rounded-md py-2 text-center">Social</div>
            </div>
            <div className="flex items-center justify-between w-full text-white text-md gap-4">
              <div className="w-1/3">
                <label>Width</label>
                <Input type="number" defaultValue={1024} />
              </div>
          
              <div className="flex items-end justify-center pb-3 gap-5 h-full w-1/3">
                <LockKeyhole />
                <LockKeyholeOpen />
              </div>
        
              <div className="w-1/3">
                <label>Height</label>
                <Input type="number" defaultValue={1024} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 items-center">
            <div className="flex justify-between w-full text-white items-center">
              <p className="text-md ml-2 text-white">
                Save as
              </p>
              <div>
              <Select defaultValue="jpeg">
                <SelectTrigger className="w-[260px]">
                  <SelectValue  className="text-white text-md ml-2" placeholder="JPEG" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800">
                  <SelectGroup className="text-white text-md ml-2 font-medium">
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WEBP</SelectItem>
                    <SelectItem value="svg">SVG</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </div>
            </div>

            <div className="flex justify-between w-full text-white items-center">
              <p className="text-md ml-2 text-white">
                Compress
              </p>
              <div>
              <Select defaultValue="no">
                <SelectTrigger className="w-[260px]">
                  <SelectValue  className="text-white text-md ml-2" placeholder="No Compression" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800">
                  <SelectGroup className="text-white text-md ml-2 font-medium">
                    <SelectItem value="high">High Compression</SelectItem>
                    <SelectItem value="medium">Medium Compression</SelectItem>
                    <SelectItem value="low">Light Compression</SelectItem>
                    <SelectItem value="no">No Compression</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </div>
            </div>
            
            <div className="flex gap-2 items-center text-white">
              <Checkbox className="data-[state=checked]:border-amber-600 data-[state=checked]:bg-amber-600 data-[state=checked]:text-white dark:data-[state=checked]:border-amber-700 dark:data-[state=checked]:bg-amber-700"/>
              <label className="text-md ml-2 text-white">Set Max Size</label>
            </div>
            <button className=" w-full text-center px-1 py-2 rounded-md bg-amber-700 font-md text-base">Resize</button>
          </div>
        </div>
      </div>
    </div>
  )
}