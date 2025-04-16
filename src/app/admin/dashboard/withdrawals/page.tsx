import { fetchTransactions } from "@/actions/admin";
import WithdrawalsTable from "@/components/admin/Withdrawals";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async () => {
  const { transactions } = await fetchTransactions();
  const withdrawals = transactions.filter((t) => t.type === "withdrawal");
  return (
    <div>
      <p className="text-lg font-semibold font-sans">Transaction</p>
      <div className="mt-5">
        <WithdrawalsTable data={withdrawals || []} />
      </div>
    </div>
  );
};

export default Page;
