import TransactionTable from "@/components/dashboard/WalletTransactionTable";
import { Button } from "@/components/ui/button";
import React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Page = () => {
  return (
    <div>
      <p className="text-2xl text-colorSecondary font-sans font-semibold">
        Wallet
      </p>
      <div className="p-6 rounded-md mt-10 bg-secondary-grey">
        <div className="flex justify-between items-center mb-4">
          <h2 className="md:text-2xl text-xl font-normal text-gray-500">Total Balance</h2>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-green-600 to-white flex items-center">
              <div className="w-1/2 h-full bg-green-600"></div>
              <div className="w-1/2 h-full bg-white"></div>
            </div>
            <span className="font-medium">NGN</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-bold flex items-center">
            <span className="font-normal">₦</span>0
          </h1>
        </div>

        <div className="grid ml-auto grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex items-center cursor-pointer justify-center gap-2 py-6 bg-gray-50 hover:bg-gray-100 border-gray-100 rounded-xl"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <FaMinusCircle />
            </div>
            <span className="text-lg font-medium">Deposit</span>
          </Button>

          <Button
            variant="outline"
            className="flex items-center cursor-pointer justify-center gap-2 py-6 bg-gray-50 hover:bg-gray-100 border-gray-100 rounded-xl"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <FaPlusCircle />
            </div>
            <span className="text-lg font-medium">Withdraw</span>
          </Button>
        </div>
      </div>
      <div className="mt-10">
      <TransactionTable/>
      </div>
    </div>
  );
};

export default Page;
