"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaToolbox } from "react-icons/fa";
import { TbTools } from "react-icons/tb";
import { LuPenTool } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { BsQuestionSquare } from "react-icons/bs";
import clsx from "clsx";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: <FaHome />, href: "/" },
    { icon: <TbTools />, href: "/tools" },
    { icon: <LuPenTool />, href: "/library" },
    { icon: <TfiWrite />, href: "/gallery" },
    { icon: <FaToolbox />, href: "/print" },
    { icon: <BsQuestionSquare />, href: "/help" },
  ];

  return (
    <nav
      className={clsx(
        "fixed bottom-3 left-1/2 -translate-x-1/2",
        "bg-[#F0F0F0]",
        "shadow-5xl",
        "rounded-2xl",
        "px-6 py-3",
        "flex items-center gap-2",
        "border-gray-800",
        "z-9999"
      )}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all",
              { "bg-red-500 text-white": isActive }
            )}
          >
            <span className={clsx("text-xl")}>{item.icon}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
