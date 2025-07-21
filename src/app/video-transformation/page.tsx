"use client"
import CloudinaryUploadVideo from "@/components/CloudinaryVideoUpload";
import Navbar from "@/components/Navbar";
import {  getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import {  CSSProperties, useCallback, useEffect,useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "sonner";
import Image from "next/image";
// import { CldImage } from 'next-cloudinary'

const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

type VideoData = {
    compressedSize?: string | number;
    originalSize?: string | number;
    
};

export default function ConvertFromJPG(){
    const [url,setUrl] = useState<string | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
    const [data,setData] = useState<VideoData>({})

    const handleUrl = (url : string)    => {
        setUrl(url)

    }

    

    useEffect(() => {
        const timeout = setTimeout(() => {
          setLoading(false);
        }, 1500); 
    
        return () => clearTimeout(timeout); 
      }, []);



      const getThumbnailUrl = useCallback((publicId: string) => {
        return getCldImageUrl({
            src: publicId,
            width: 400,
            height: 225,
            crop: "fill",
            gravity: "auto",
            format: "jpg",
            quality: "auto",
            assetType: "video"
        })
    }, [])

     const getFullVideoUrl = useCallback((publicId: string) => {
        return getCldVideoUrl({
            src: publicId,
            width: 1920,
            height: 1080,

        })
    }, [])
      

      const handleDownload =  () => {

    if(!url) return
        const videoUrl = getFullVideoUrl(url)
  toast.promise(
    fetch(videoUrl)
      .then((response) => {
        if (!response.ok) throw new Error("Download failed");
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `converted-video.mp4`; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }),
    {
      loading: "Downloading video...",
      success: "Video downloaded successfully!",
      error: "Failed to download video.",
    }
  );
};


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
                                            Tranform Video
                                        </p>
                                        <p className="text-lg font-light tracking-wide max-w-lg">
                                            Quickly transform videos and remove backgrounds with just one click. Perfect for creating polished, professional content in seconds.
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <div className="mx-auto ">
                                            <CloudinaryUploadVideo onUploadComplete={handleUrl} className="mx-auto" setLoading={setLoading} setData={setData}/> 
                                        </div>
                                    </div>
                                </>
                            )
                            :
    
                            (
                                <>
                                    <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-gray-800 p-6 text-center shadow-lg w-full max-w-md">
                                        <Image
                                            src={getThumbnailUrl(url)}
                                            className="rounded-lg object-cover w-full aspect-video"
                                            width={400}
                                            height={225}
                                            alt="Video Thumbnail"
                                        />

                                        <div className="space-y-2">
                                            <p className="text-sm text-white font-medium">
                                            <span className="text-gray-400">Compressed Size:</span>{" "}
                                            {(Number(data.compressedSize) / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                            <p className="text-sm text-white font-medium">
                                            <span className="text-gray-400">Original Size:</span>{" "}
                                            {(Number(data.originalSize) / (1024 * 1024)).toFixed(2)} MB
                                            </p>
                                        </div>
                                        </div>
                                    
                                    
                                        <div
                                        className="flex flex-col gap-3 items-center mt-4 w-full px-4"
                                        onClick={handleDownload}
                                    >   
                                        
                                        <button className="w-full max-w-xs text-center px-4 py-2 rounded-md bg-amber-700 font-medium text-base text-white hover:bg-amber-800">
                                            Download
                                        </button>
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
