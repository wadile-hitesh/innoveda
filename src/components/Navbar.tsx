"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const navItems = [
    {
      name: "Resize",
      path: "/",
    },
    {
      name: "Social Share",
      path: "/social-share",
    },
    {
      name: "Convert",
      path: "/convert",
    },
    {
      name: "Crop",
      path: "/crop",
    },
    {
      name: "Watermark",
      path: "/watermark",
    },
  ];

  const [active, setActive] = useState<string | null>("");

  const pathname = usePathname();
  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  return (
    <div className=" backdrop-blur-lg sticky top-0 z-40 w-full dark:bg-gray-900">
      <div className="flex justify-between w-full container text-white px-8 py-2 mx-auto">
        <div className="flex items-center ">
          <Image
            src="/images/innoveda-logo.svg"
            alt="Innoveda Logo"
            width={40}
            height={40}
          />
          <p className="text-xl">Innoveda</p>
        </div>
        <div className="flex items-center text-sm ">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link href={item.path}>
                <div className="py-2 px-5 hover:bg-gray-800 hover:rounded-md group">
                  <p
                    className={
                      String(active) === String(item.path)
                        ? "underline underline-offset-[20px] decoration-orange-500 decoration-2 transition-all"
                        : ""
                    }
                  >
                    {item.name}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
