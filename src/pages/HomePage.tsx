import Navbar from "@/components/Navbar";
import ResizeImage from "@/components/ResizeImage";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full max-w-screen min-h-screen mx-auto overflow-x-hidden overflow-y-auto dark:bg-gray-900">
      <Navbar />
      <ResizeImage />
    </div>
  );
}
