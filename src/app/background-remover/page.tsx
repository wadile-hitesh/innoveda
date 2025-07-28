
import BackgroundRemover from "@/pages/BackgroundRemover";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Remove Background from Images – Free Tool | Innoveda",
  description: "Remove image backgrounds instantly using AI. No sign-up required.",
  alternates: {
    canonical: "https://innoveda.tech/background-remover",
  },
};

export default function page(){
    


    return (
            <>
                <BackgroundRemover />
            </>
        )
    
    
}
