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
import { FaBitcoin, FaUsers } from "react-icons/fa";
import { LuWalletMinimal } from "react-icons/lu";

// Define the navigation items
const navigationItems = [
  { name: "Home", href: "/admin/dashboard", icon: Home },
  { name: "Users", href: "/admin/dashboard/users", icon: FaUsers },
  { name: "Giftcards", href: "/admin/dashboard/gift-cards", icon: TbGiftCard },
  { name: "Cryptocurrencies", href: "/admin/dashboard/crypto", icon: FaBitcoin },
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
  { name: "Help & Support", href: "/admin/dashboard/support", icon: HelpCircle },
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
              src="/app-logo.png"
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
    </div>
  );
}
