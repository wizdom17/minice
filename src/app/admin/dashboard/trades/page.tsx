import { fetchTrades } from "@/actions/admin";
import Trades from "@/components/admin/Trades";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async () => {
  const { trades } = await fetchTrades();
  return (
    <div>
      <div className="">
        <Trades trades={trades} />
      </div>
    </div>
  );
};

export default Page;
