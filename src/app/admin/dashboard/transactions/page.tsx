import { fetchTransactions } from "@/actions/admin";
import AdminTransactionsTable from "@/components/admin/TransactionsTable";
import React from "react";

const Page = async () => {
  const { transactions } = await fetchTransactions();
  return (
    <div>
      <p className="text-lg font-semibold font-sans">Transaction</p>
      <div className="mt-5">
        <AdminTransactionsTable data={transactions} />
      </div>
    </div>
  );
};

export default Page;
