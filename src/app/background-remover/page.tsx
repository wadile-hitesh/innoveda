"use client"
import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import {  useState } from "react";



export default function BackgroundRemover(){
    const [url,setUrl] = useState<string | null>(null)
    const handleUrl = (url : string)    => {
        setUrl(url + "?tr=e-bgremove")
    }

    // useEffect(()=>{
    //     (
    //         async ()=>{
    //             let authParams;
    
    //             try {
    //                 authParams = await authenticator() 
    //             } catch (authError) {
    //                 console.error("Failed to authenticate for upload:", authError);
    //                 return;
    //             }
            
    //             const {token, expire, signature, publicKey} = authParams

    //             try {
                    
    //             } catch (error) {
    //                 if (error instanceof ImageKitAbortError) {
    //                     console.error("Upload aborted:", error.reason);
    //                 } else if (error instanceof ImageKitInvalidRequestError) {
    //                     console.error("Invalid request:", error.message);
    //                 } else if (error instanceof ImageKitUploadNetworkError) {
    //                     console.error("Network error:", error.message);
    //                 } else if (error instanceof ImageKitServerError) {
    //                     console.error("Server error:", error.message);
    //                 } else {
    //                     console.error("Upload error:", error);
    //                 }
    //             }
    //         }
    //     )();
    // },[url])

    
    return (
        <div className="w-full h-screen flex items-center ">
            {
                !url ? 
                <UploadImage onUploadComplete={handleUrl} />
                : 
                <div>
                    <Image 
                        src={url}
                        width={1024}
                        height={1024}
                        alt="Uploaded Image"
                    />
                </div>
            }

        </div>
    )
}
