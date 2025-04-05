"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ArrowLeftRight,
  Wallet,
  Gift,
  Settings,
  HelpCircle,
} from "lucide-react";
import { TbGiftCard } from "react-icons/tb";
import Image from "next/image";

// Define the navigation items
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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="h-screen lg:flex hidden flex-col px-4 pb-10 lg:pb-0 overflow-y-auto bg-gray-50 border-r border-gray-100">
      {/* Logo */}
      <div className="pt-8 pl-2 pb-8">
        <Link href="/dashboard" className="flex-shrink-0">
          <div className="w-40 h-8 relative">
            <Image
              src="/images/logo-prest.svg"
              alt="Minicex"
              fill
              className="object-contain"
            />
          </div>
        </Link>
      </div>

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
  );
}
