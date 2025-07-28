"use client"
import Navbar from "@/components/Navbar";
import UploadImage from "@/components/UploadImage";
import Image from "next/image";
import { useState, useEffect, CSSProperties } from "react";
import { toast } from "sonner";
import axios from "axios"
import { ClimbingBoxLoader } from "react-spinners"


interface ImageFormatProps {
    size : string,
    label : string,
    width : number | 1024,
    height : number | 1024
}


export default function SocialShare(){
    const [url,setUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const handleUrl = (url : string)    => {
        setUrl(url)
    }

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    const instagramFormats : ImageFormatProps[] = [
        { size: "320 x 320", label: "Profile picture", width : 320, height : 320 },
        { size: "1080 x 1080", label: "Square post",width : 1080, height : 1080 },
        { size: "1080 x 566", label: "Landscape post",width : 1080, height : 566 },
        { size: "1080 x 1350", label: "Portrait post",width : 1080, height : 1350 },
        
    ];

    const [imageSize, setImageSize] = useState<ImageFormatProps>()

    const handleResize = (format : ImageFormatProps )=>{
        setImageSize(format)
    }

    const handleResizeImage = async ()=> {
        if(!url){
            toast.error("Upload Image")
            return
        }
        if(!imageSize){
            toast.error("Please Select Image Format")
            return
        }
        const imageUrl = `${url}?tr=w-${imageSize.width},h-${imageSize.height}`;
        
         try {
            const response = await axios.get(imageUrl, {
                responseType : 'blob'
            });
            const blob = response.data;

            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = blobUrl;
            link.download = `resized-image-${imageSize.width}x${imageSize.height}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(blobUrl);
            toast.success("Image downloaded!");
        } catch (error) {
            console.error("Download failed:", error);
            toast.error("Failed to download image.");
        }

        
    }
    
    useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timeout); 
  }, []);
        
    
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
                <div className="w-full flex">
                    <div className="w-2/7 h-full px-3">
                        <div className="flex flex-col h-full ">
                            <div className="flex flex-col gap-10">
                                <div className="bg-gray-800  w-full  p-1 text-gray-300 font-bold text-sm rounded-md">
                                    <div className=" rounded-md py-2 text-center flex items-center justify-center">
                                        Social
                                    </div>
                                </div>
                            
                            </div>
                            <div className="max-h-[calc(100vh-180px)] overflow-y-auto grid grid-cols-3 gap-2 mt-4 pr-1">
                                {instagramFormats.map((format, idx) => {
                                    const [w, h] = format.size.split("x").map(Number);

                                    const innerBoxWidth = 80; // inner component base width in px
                                    const aspectRatio = h / w;
                                    const innerBoxHeight = Math.round(innerBoxWidth * aspectRatio);
                                    
                                    return (
                                    <div
                                    key={idx}
                                    className={`transition-all duration-150 p-3 rounded-md text-center text-white hover:bg-gray-800 ${
                                        format.size === imageSize?.size ? "bg-gray-800 ring-orange-500" : ""
                                    }`}
                                    onClick={() => handleResize(format)}
                                    >   
                                        <div className="bg-gray-800 rounded-md w-28 h-28 flex items-center justify-center">
                                            <div className="m-2 bg-gray-600 rounded-md "
                                            style={{
                                                width: `${innerBoxWidth}px`,
                                                height: `${innerBoxHeight}px`,
                                            }}>
                                                <div className="text-sm flex items-center justify-center">{format.size}</div>
                                            </div>
                                        </div>
                                            <div className="text-xs font-semibold text-gray-300">{format.label}</div>
                                    </div>
                                )
                            })}
                            </div>
                            <div className="flex flex-col gap-5 items-center" onClick={handleResizeImage}>
                                <button className="w-full text-center px-1 py-2 rounded-md bg-amber-700 font-md text-base cursor-pointer">Resize</button>
                            </div>
                        </div>
                    </div>

                    
                    <div className="w-5/7 h-full px-3 flex flex-col text-white items-center gap-10">
                    {
                        !url ? 
                        (
                            <>
                                <div className="flex flex-col gap-5 items-center text-center">
                                    <p className="text-4xl font-bold">
                                        Social Share
                                    </p>
                                    <p className="text-lg font-light tracking-wide max-w-lg">
                                    Auto-resize images for <span className="font-medium text-orange-600">Instagram</span>, <span className="font-medium text-orange-600">Twitter</span>, <span className="font-medium text-orange-600">Facebook</span> & more — perfect fit every time.
                                    </p>
                                </div>
                                <div className="w-full">
                                    <div className="mx-auto ">
                                        <UploadImage onUploadComplete={handleUrl} className="mx-auto" setLoading={setLoading} />
                                    </div>
                                </div>
                            </>
                        )
                        :

                        (
                            <>
                                <div className="relative h-[500px] w-full">
                                    <Image
                                        src={url}
                                        alt="Resize Image"
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
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