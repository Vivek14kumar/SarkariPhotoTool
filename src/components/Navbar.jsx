"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "./LanguageToggle";
import Image from "next/image";
import {
  Home,
  Image as ImageIcon,
  PenTool,
  Type,
  Layers,
  BookOpen,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Photo Resizer", href: "/photo-resizer", icon: ImageIcon },
    { name: "Signature", href: "/signature-resizer", icon: PenTool },
    { name: "Name & Date", href: "/nameDatemerger", icon: Type },
    { name: "Merge Tool", href: "/merger", icon: Layers },
    { name: "Blog", href: "/blogs", icon: BookOpen },
  ];

  return (
    <>
      {/* TOP NAVBAR */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
         <div className="flex items-start gap-2">
  <Image
    src="/favicon.ico"
    alt="Sarkari Photo Tool Logo"
    width={32}
    height={32}
    priority
  />

  <div className="flex flex-col leading-tight">
    <h1 className="text-2xl font-extrabold text-gradient">
      <Link href="/">Sarkari Photo Tool</Link>
    </h1>
    <p className="text-[10px] text-gray-500 italic animate-fade-in">
      Photo & Signature Resize Tool for Govt Exam Forms
    </p>
  </div>
</div>


          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 font-medium">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 relative transition
                    ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-800 hover:text-blue-600"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}

                  {/* underline */}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-blue-600 rounded" />
                  )}
                </Link>
              );
            })}
          </div>

          <LanguageToggle />
        </nav>
      </header>

      {/* BOTTOM APP NAV (MOBILE ONLY) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-lg">
        <div className="flex justify-around items-center py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center text-xs transition
                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-blue-600"
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
                {item.name.split(" ")[0]}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </>
  );
}
