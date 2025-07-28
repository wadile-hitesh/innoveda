"use client"
import CloudinaryUploadImage from "@/components/CloudinaryImageUpload";
import Navbar from "@/components/Navbar";
import {  CSSProperties, useEffect, useRef, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { CldImage, getCldImageUrl } from 'next-cloudinary'

const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    

export default function BackgroundRemover(){
    const [url,setUrl] = useState<string | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
    const [backgroundRemoved,setBackgroundRemoved] = useState<boolean>(false)
    const handleUrl = (url : string)    => {
        setUrl(url)
    }

    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 1500); 
    
        return () => clearTimeout(timeout); 
      }, []);

      const handleBackgroundRemoval = ()=>{
        if (!url) return; // Prevent calling with null
        setLoading(true)
        const responseUrl = getCldImageUrl({
            width: 960,
            height: 600,
            src: url,
            removeBackground : true
        })
        setUrl(responseUrl)
        setBackgroundRemoved(true)
      }

      const handleDownload = () => {
        if(!imageRef.current) return;

        fetch(imageRef.current.src)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a");
            link.href = url;
            link.download = `RemovedBackgroundImage.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
    }


    return (
            <div className="flex flex-col h-screen">
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
                <Navbar />
                <div className="flex-1 flex py-5">
                    <div className="w-full flex justify-center">    
                        
                        <div className="w-5/7 h-full px-3 flex flex-col text-white items-center gap-10">
                        {
                            !url ? 
                            (
                                <>
                                    <div className="flex flex-col gap-5 items-center text-center">
                                        <p className="text-4xl font-bold">
                                            Remove Background
                                        </p>
                                        <p className="text-lg font-light tracking-wide max-w-lg">
                                            Automatically remove image backgrounds with a single click. Perfect for clean, professional content creation.
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <div className="mx-auto ">
                                            <CloudinaryUploadImage onUploadComplete={handleUrl} className="mx-auto" setLoading={setLoading} />
                                        </div>
                                    </div>
                                </>
                            )
                            :
    
                            (
                                <>
                                    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
                                        <div className="w-[600px] aspect-[4/3]">
                                            {
                                                !backgroundRemoved ?
                                                    <CldImage
                                                src={url}
                                                alt="Resize Image"
                                                width={600}
                                                height={300}
                                                sizes="(max-width: 768px) 80vw, 300px"
                                                className="object-contain w-full h-full"
                                                
                                            />  :
                                            <CldImage
                                                ref={imageRef}
                                                src={url}
                                                alt="Resize Image"
                                                width={600}
                                                height={300}
                                                sizes="(max-width: 768px) 80vw, 300px"
                                                className="object-contain w-full h-full"
                                                removeBackground
                                                onLoad={()=> setLoading(false)}
                                            />


                                            }
                                            
                                        </div>
                                    <div
                                        className="flex flex-col gap-3 items-center mt-4 w-full px-4"
                                        onClick={backgroundRemoved ? handleDownload : handleBackgroundRemoval}
                                    >
                                        <button className="w-full max-w-xs text-center px-4 py-2 rounded-md bg-amber-700 font-medium text-base text-white hover:bg-amber-800">
                                            {backgroundRemoved ? "Download" : "Remove Background"}
                                        </button>
                                    </div>
                                </div>
                                </>
                            )
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    
    
}
