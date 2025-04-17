import type { Metadata } from "next";
import "../globals.css";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/layout/DashboardHeader";
import { fetchUser } from "@/actions/user";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Trusted gift card and cryptocurrency trading platform",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await fetchUser();
  return (
    <main className="flex h-screen overflow-y-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {user && <DashboardHeader user={user} />}
        <div className="p-10 md:px-10 px-3">{children}</div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}
