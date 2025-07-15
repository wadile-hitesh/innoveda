"use client";
import HomePage from "@/pages/HomePage";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
    redirect("/social-share")
  },[])

  return (
    <div className="w-full min-h-screen font-[family-name:var(--font-geist-sans)] bg-gray-900 flex justify-center absolute p-0 m-0">
      <HomePage />
    </div>
  );
}
