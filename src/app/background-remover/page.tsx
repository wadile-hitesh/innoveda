"use client"
import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import {  CSSProperties, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

export default function BackgroundRemover(){
    const [url,setUrl] = useState<string | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
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
            {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg ">
                <ClimbingBoxLoader 
                loading={loading}
                color="#F97316"
                size={50}
                cssOverride={override}
                />
            </div>
            )}
            {
                !url ? 
                <UploadImage onUploadComplete={handleUrl} className="" setLoading={setLoading}/>
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
