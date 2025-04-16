"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Rate Calculator",
    href: "/rate-calculator",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];
const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <header className="bg-white shadow-sm">
      <div className="section-container py-4 lg:px-20 md:px-10 px-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-48 h-9 relative">
              <Image
                src="/app-logo.png"
                alt="Minicex"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          {/* Main Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8">
            {links.map((item, i) => (
              <Link
                className="text-sm font-sans font-[550] text-colorSecondary"
                key={i}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Auth Links */}
          <div className="flex items-center space-x-4">
            <Link
              href={"/auth/login"}
              className="hidden sm:inline-flex border-transparent text-blue-600 hover:border-blue-600 border rounded-md transition duration-300 py-3 px-4"
            >
              Log In
            </Link>
            <Link
              href={"/auth/register"}
              className="bg-blue-600 font-bold text-sm  hidden sm:inline-flex p-3 py-4 rounded-md hover:bg-blue-700 text-white"
            >
              Sign Up For Free
            </Link>

            {/* Mobile Menu Button - Visible only on mobile */}
            <button onClick={() => setOpenModal(true)} className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent side="left" className="w-[350px] lg:hidden">
          <SheetHeader className="bg-primary-bg p-7">
            <div className="">
              <Image
                src="/app-logo.png"
                alt="logo"
                height={70}
                width={120}
                className="object-contain"
              />
            </div>
          </SheetHeader>
          <div className="flex flex-col gap-y-7 p-5">
            {links.map((item, i) => (
              <Link
                onClick={() => setOpenModal(true)}
                className="font-sans font-700 text-colorSecondary"
                key={i}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
            <Link
              onClick={() => setOpenModal(true)}
              href={"/auth/login"}
              className="text-blue-600 border-2  hover:border-blue-600 border-blue-500 rounded-md transition duration-300 py-3 px-4"
            >
              Log In
            </Link>
            <Link
              onClick={() => setOpenModal(true)}
              href={"/auth/register"}
              className="bg-blue-600 font-bold text-sm p-3 py-4 rounded-md hover:bg-blue-700 text-white"
            >
              Sign Up For Free
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
