import SocialShare from "@/pages/SocialShare";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Social Share Image Generator – Free Tool | Innoveda",
  description: "Create and preview social media share images (Instagram, Twitter , LinkedIn) online.",
  alternates: {
    canonical: "https://innoveda.tech/social-share",
  },
};

export default function page() {
    return (
        <>
        <SocialShare />
        </>
    )
}