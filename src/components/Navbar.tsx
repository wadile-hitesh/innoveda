import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  const navItems = [
    {
      name: "Resize",
      path: "/",
    },
  ];

  return (
    <div className="container">
      <div className="flex justify-between text-black">
        <div>
          <Image
            src="/images/innoveda-logo.svg"
            alt="Innoveda Logo"
            width={50}
            height={50}
          />
        </div>
        <div className="">
          {navItems.map((item) => (
            <div key={item.name}>
              <Link href={item.path}>
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
