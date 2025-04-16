"use client";
import Image from "next/image";
import React from "react";
import { FaBitcoin, FaCaretDown, FaUsers } from "react-icons/fa";
import { LuBellDot, LuWalletMinimal } from "react-icons/lu";
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
  Settings,
  HelpCircle,
} from "lucide-react";
import { TbGiftCard } from "react-icons/tb";
import { usePathname } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Admin } from "@/actions/admin";

const navigationItems = [
  { name: "Home", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/dashboard/users", icon: FaUsers },
  { name: "Giftcards", href: "/admin/dashboard/gift-cards", icon: TbGiftCard },
  {
    name: "Cryptocurrencies",
    href: "/admin/dashboard/crypto",
    icon: FaBitcoin,
  },
  {
    name: "Transactions",
    href: "/admin/dashboard/transactions",
    icon: ArrowLeftRight,
  },
  {
      name: "Withrawals",
      href: "/admin/dashboard/withdrawals",
      icon: LuWalletMinimal,
    },
  {
    name: "Trades",
    href: "/admin/dashboard/trades",
    icon: ArrowLeftRight,
  },
  { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
  {
    name: "Help & Support",
    href: "/admin/dashboard/support",
    icon: HelpCircle,
  },
];

const DashboardHeader = ({ user }: { user: Admin }) => {
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");
      if (res.status === 200) {
        window.location.href = "/";
      }
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };
  const [openSidebar, setOpenSidebar] = React.useState(false);

  return (
    <div className="md:px-10 px-5 py-8 border-b border-muted">
      <div className="flex items-center justify-between">
        <p className="font-sans text-lg lg:block hidden">
          <span className="text-2xl font-semibold ">Hello</span>{" "}
          {user.firstname}, 👋🏼
        </p>
        <RiMenuUnfoldLine
          onClick={() => setOpenSidebar(true)}
          size={30}
          className="text-colorSecondary block lg:hidden cursor-pointer"
        />
        <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
          <SheetContent side="left" className="w-[250px] lg:hidden">
            <SheetHeader className="bg-primary-bg p-7">
              <div className="flex items-center gap-x-3">
                <div className="p-1 bg-white rounded-full">
                  <Image
                    src="/images/user.png"
                    alt="user"
                    height={37}
                    width={37}
                    className="object-contain rounded-full"
                  />
                </div>
                <p className="font-sans font-semibold text-blue-500">
                  {user.firstname}
                </p>
              </div>
            </SheetHeader>
            <div className=" flex flex-col px-4 pb-10 lg:pb-0 overflow-y-auto bg-gray-50 border-r border-gray-100">
              {/* Navigation Menu */}
              <nav className="mt-3">
                <ul className="space-y-3">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.name}>
                        <Link
                          onClick={() => setOpenSidebar(false)}
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
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-x-3 px-3 py-3 cursor-pointer"
                >
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
