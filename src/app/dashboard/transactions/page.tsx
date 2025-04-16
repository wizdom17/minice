import { fetchTransactions } from "@/actions/user";
import TransactionTable from "@/components/dashboard/Transactions";
import React from "react";
export const dynamic = "force-dynamic";

const Page = async () => {
  const {transactions} = await fetchTransactions();
  return (
    <div>
      <p className="text-2xl text-colorSecondary font-sans font-semibold">
        Transactions
      </p>
      <div className="mt-10">
        {transactions && <TransactionTable data={transactions}  />}
      </div>
    </div>
  );
};

export default Page;
