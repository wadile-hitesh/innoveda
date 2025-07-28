import ConvertFromJPG from "@/pages/ConvertJpg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Images to JPG – Online Free Tool | Innoveda",
  description: "Quickly convert PNG, WebP, and other formats to JPG online for free.",
  alternates: {
    canonical: "https://innoveda.tech/convert-from-jpg",
  },
};


export default function page(){
    return (
        <>
        <ConvertFromJPG />
        </>
    )
}