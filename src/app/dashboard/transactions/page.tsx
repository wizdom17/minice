import TransactionTable from "@/components/dashboard/Transactions";
import React from "react";

const Page = () => {
  return (
    <div>
      <p className="text-2xl text-colorSecondary font-sans font-semibold">
        Transactions
      </p>
      <div className="mt-10">
        <TransactionTable />
      </div>
    </div>
  );
};

export default Page;
