import { fetchTransactions, fetchUser } from "@/actions/user";
import Wallet from "@/components/dashboard/Wallet";
import TransactionTable from "@/components/dashboard/WalletTransactionTable";
import React from "react";

const Page = async () => {
  const { transactions } = await fetchTransactions();
  const { user } = await fetchUser();
  return (
    <div>
      <p className="text-2xl text-colorSecondary font-sans font-semibold">
        Wallet
      </p>
      {user && <Wallet user={user} />}
      <div className="mt-10">
        {transactions && <TransactionTable data={transactions} />}
      </div>
    </div>
  );
};

export default Page;
