import { fetchTrade } from "@/actions/admin";
import ViewCryptoTrade from "@/components/admin/CryptoTradeView";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { trade } = await fetchTrade(id);
  return (
    <div className="">
      <p className="text-lg font-sans font-semibold">Manage Trade</p>
      <div className="mt-10">{trade && <ViewCryptoTrade trade={trade} />}</div>
    </div>
  );
};

export default Page;
