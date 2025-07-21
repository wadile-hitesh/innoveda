"use client"
import CloudinaryUploadImage from "@/components/CloudinaryImageUpload";
import Navbar from "@/components/Navbar";
import { CldImage } from "next-cloudinary";
import {  CSSProperties, useEffect, useRef,useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { toast } from "sonner";
// import { CldImage } from 'next-cloudinary'

const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

export default function ConvertFromJPG(){
    const [url,setUrl] = useState<string | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
    const [format,setFormat] = useState<string>("jpg")
    const [convertedUrl,setConvertedUrl] = useState<boolean>(false)
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

      const handleConvert = ()=> {
        setConvertedUrl(true)
      }

      

      const handleDownload = () => {
        if(!imageRef.current) return;
        toast.promise(
        fetch(imageRef.current.src)
            .then((response) => {
                if (!response.ok) throw new Error("Download failed");
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `converted-image.${format}`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }),
        {
            loading: "Downloading image...",
            success: "Image downloaded successfully!",
            error: "Failed to download image.",
        }
    );
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
                                            Convert from JPG
                                        </p>
                                        <p className="text-lg font-light tracking-wide max-w-lg">
                                            Easily convert JPG images and remove their backgrounds with a single click. Ideal for clean, professional content creation.
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <div className="mx-auto ">
                                            <CloudinaryUploadImage onUploadComplete={handleUrl} className="mx-auto" setLoading={setLoading} accept=".jpg"/>
                                        </div>
                                    </div>
                                </>
                            )
                            :
    
                            (
                                <>
                                    <div className="flex flex-col gap-5 items-center text-center">
                                        <p className="text-4xl font-bold">
                                            Convert from JPG
                                        </p>
                                        <p className="text-lg font-light tracking-wide max-w-lg">
                                            Easily convert JPG images and remove their backgrounds with a single click. Ideal for clean, professional content creation.
                                        </p>
                                    </div>
                                    <div className="w-full">
                                        <div className="mx-auto">
                                            <label htmlFor="format" className="block mb-2 text-sm font-medium text-white">
                                            Select format to convert
                                            </label>
                                            <select
                                            id="format"
                                            name="format"
                                            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                                            value={format}
                                            onChange={(e) => setFormat((e.target as HTMLSelectElement).value)}
                                            >
                                            <option value="jpg">JPG</option>
                                            <option value="jpeg">JPEG</option>
                                            <option value="png">PNG</option>
                                            <option value="webp">WEBP</option>
                                            {/* <option value="svg">SVG</option> */}
                                            </select>
                                        </div>
                                        </div>
                                    {
                                        !convertedUrl ? 
                                            <div
                                            className="flex flex-col gap-3 items-center mt-4 w-full px-4"
                                            onClick={handleConvert}
                                        >
                                            <button className="w-full max-w-xs text-center px-4 py-2 rounded-md bg-amber-700 font-medium text-base text-white hover:bg-amber-800">
                                                Convert
                                            </button>
                                        </div>
                                        : 
                                        <div
                                        className="flex flex-col gap-3 items-center mt-4 w-full px-4"
                                        onClick={handleDownload}
                                    >   
                                        <CldImage
                                                        className="hidden"
                                                        format={format}
                                                        width={200}
                                                        height={200}
                                                        ref={imageRef} alt={""} src={url}                                        />
                                        <button className="w-full max-w-xs text-center px-4 py-2 rounded-md bg-amber-700 font-medium text-base text-white hover:bg-amber-800">
                                            Download
                                        </button>
                                    </div>
                                    }
                                    
                                    
                                
                                </>
                            )
                        }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    
    
}
