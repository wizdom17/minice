"use server";
import "../../globals.css";
import Sidebar from "@/components/admin/SideBar";
import { Toaster } from "react-hot-toast";
import DashboardHeader from "@/components/admin/DashboardHeader";
import { fetchAdmin } from "@/actions/admin";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await fetchAdmin();
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
