"use client";
import Image from "next/image";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { LuBellDot } from "react-icons/lu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { RiMenuUnfoldLine } from "react-icons/ri";
import {
  Home,
  ArrowLeftRight,
  Wallet,
  Gift,
  Settings,
  HelpCircle,
} from "lucide-react";
import { TbGiftCard } from "react-icons/tb";
import { usePathname } from "next/navigation";

const navigationItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Giftcards", href: "/dashboard/gift-cards", icon: TbGiftCard },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Referral",
    href: "/dashboard/referral",
    icon: Gift,
    highlight: true,
  },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
];
const DashboardHeader = () => {
  const pathname = usePathname();

  return (
    <div className="md:px-10 px-5 py-8 border-b border-muted">
      <div className="flex items-center justify-between">
        <p className="font-sans text-lg lg:block hidden">
          <span className="text-2xl font-semibold ">Hello</span> wisdom4life, 👋🏼
        </p>
        <Sheet>
          <SheetTrigger>
            <RiMenuUnfoldLine
              size={30}
              className="lg:hidden text-colorSecondary block"
            />
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px]">
            <SheetHeader className="bg-primary-bg p-7">
              <div className="flex items-center gap-x-3">
                <div className="p-1 bg-white rounded-full">
                  <Image
                    src="/images/user-photo.svg"
                    alt="user"
                    height={37}
                    width={37}
                    className="object-contain rounded-full"
                  />
                </div>
                <p className="font-sans font-semibold text-blue-500">Wisdom4life</p>
              </div>
            </SheetHeader>
            <div className="lg:hidden flex flex-col px-4 pb-10 lg:pb-0 overflow-y-auto bg-gray-50 border-r border-gray-100">
              {/* Navigation Menu */}
              <nav className="mt-3">
                <ul className="space-y-3">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center p-3 rounded-md text-gray-900  ${
                            isActive
                              ? "bg-blue-500 text-white font-medium hover:bg-blue-500 transition-colors duration-200"
                              : "text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                          }`}
                        >
                          <item.icon
                            className={`w-5 h-5 mr-5 ${
                              isActive ? "text-white" : "text-gray-400"
                            }`}
                          />
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Today's Proverb */}
              <div className="w-[216px] min-h-[207px] max-h-[220px] mt-[40px] overflow-hidden relative bg-[#0B2253] rounded-[8px] flex flex-col p-[20px]">
                <h3 className="w-[153px] font-Rubik font-medium text-[20px] text-white mb-[4px]">
                  Today’s Proverb
                </h3>
                <p className="text-sm text-[#F7F9FB] mb-[16px]">
                  Frog wey dey run for broad daylight don see shege.
                </p>
                <p>
                  <img
                    alt="Laugh"
                    width="67"
                    height="67"
                    src="https://web.prestmit.io/_next/static/media/laugh.999f90c7.svg"
                  />
                </p>
                <p className="absolute bottom-0 right-[2px]">
                  <img
                    alt="Union"
                    width="150"
                    height="71"
                    src="https://web.prestmit.io/_next/static/media/Union.74700dcc.svg"
                  />
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex gap-x-4 items-center justify-center">
          <Sheet>
            <SheetTrigger>
              <div className="size-fit p-2 cursor-pointer rounded-full bg-primary-bg">
                <LuBellDot size={20} />
              </div>
            </SheetTrigger>
            <SheetContent className="">
              <SheetHeader className="bg-primary-bg p-7">
                <SheetTitle className="text-2xl font-sans font-semibold">
                  Notifications
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col gap-y-5 items-center justify-center">
                  <Image
                    src={"/images/no-bell.svg"}
                    alt="no bell"
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                  <p className="font-sans text-sm font-medium">
                    No Notifications
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Popover>
            <PopoverTrigger>
              <div className="flex cursor-pointer items-center justify-center gap-x-2">
                <Image
                  src="/images/user-photo.svg"
                  alt="user"
                  height={37}
                  width={37}
                  className="object-contain rounded-full"
                />
                <FaCaretDown />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[170px]">
              <div className="flex flex-col">
                <Link
                  href={"/dashboard/settings"}
                  className="flex px-3 py-3 items-center gap-x-3 border-b border-slate-300"
                >
                  <User size={18} />
                  <p className="text-sm">Profile</p>
                </Link>
                <div className="flex items-center gap-x-3 px-3 py-3 cursor-pointer">
                  <LogOut size={18} />
                  <p className="text-sm">Logout</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
