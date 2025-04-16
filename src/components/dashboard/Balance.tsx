"use client";
import React from "react";
import { Button } from "../ui/button";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { UserData } from "@/actions/user";
import DespositModal from "./DespositModal";
import WithdrawModal from "./WithdrawModal";

const Balance = ({ user }: { user: UserData }) => {
  const [openDepositModal, setOpenDepositModal] = React.useState(false);
  const [openWithdrawModal, setOpenWithdrawModal] = React.useState(false);
  return (
    <div className="p-6 rounded-md bg-secondary-grey">
      <DespositModal
        user={user}
        openModal={openDepositModal}
        setOpenModal={setOpenDepositModal}
      />
      <WithdrawModal
        user={user}
        openModal={openWithdrawModal}
        setOpenModal={setOpenWithdrawModal}
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-normal text-gray-500">Total Balance</h2>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200">
          <div className="w-6 h-6 rounded-full overflow-hidden bg-gradient-to-r from-green-600 to-white flex items-center">
            <div className="w-1/2 h-full bg-green-600"></div>
            <div className="w-1/2 h-full bg-white"></div>
          </div>
          <span className="font-medium">NGN</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-8">
        <h1 className="md:text-5xl text-3xl font-bold flex items-center">
          <span className="font-normal">₦</span>
          {user?.balance?.toLocaleString()}
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button
          onClick={() => setOpenDepositModal(true)}
          variant="outline"
          className="flex items-center cursor-pointer justify-center gap-2 py-6 bg-gray-50 hover:bg-gray-100 border-gray-100 rounded-xl"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <FaPlusCircle />
          </div>
          <span className="text-lg font-medium">Deposit</span>
        </Button>

        <Button
          onClick={() => setOpenWithdrawModal(true)}
          variant="outline"
          className="flex items-center cursor-pointer justify-center gap-2 py-6 bg-gray-50 hover:bg-gray-100 border-gray-100 rounded-xl"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <FaMinusCircle />
          </div>
          <span className="text-lg font-medium">Withdraw</span>
        </Button>

        <Button
          variant="outline"
          className="flex items-center cursor-pointer justify-center gap-2 py-6 bg-gray-50 hover:bg-gray-100 border-gray-100 rounded-xl"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <FaArrowRightArrowLeft />
          </div>
          <span className="text-lg font-medium">Trade</span>
        </Button>
      </div>
    </div>
  );
};

export default Balance;
