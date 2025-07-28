import VideoTransformation from "@/pages/VideoTransformation";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Transform Video – Compress & Optimize Videos | Innoveda",
  description: "Compress, resize, and reformat videos online. Fast & free.",
  alternates: {
    canonical: "https://www.innoveda.tech/video-transformation",
  },
};

export default function page(){
    return (
        <>
        <VideoTransformation />
        </>
    )
}