"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { PaystackButton } from "./Paystack";
import { UserData } from "@/actions/user";

const DespositModal = ({
  user,
  openModal,
  setOpenModal,
}: {
  user: UserData;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [amount, setAmount] = useState<number>(0);
  useEffect(() => {
    setAmount(0);
  }, [openModal]);
  return (
    <Sheet open={openModal} onOpenChange={setOpenModal}>
      <SheetContent
        side="right"
        className="w-[300px] lg:w-[400px] overflow-y-auto"
      >
        <SheetHeader className="bg-primary-bg p-7">
          <SheetTitle className="text-2xl font-sans font-semibold">
            Deposit
          </SheetTitle>
        </SheetHeader>
        <div className="p-7">
          <div className="">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  type="number"
                  id="amount"
                  placeholder="Enter amount"
                  className="border border-gray-300 focus:border-none rounded-md p-2 focus:outline-blue-500"
                />
                <div className="flex px-1 items-center justify-between text-xs font-sans font-medium text-gray-500">
                  <p>Minimum Deposit</p>
                  <p>₦1000</p>
                </div>
              </div>
              <PaystackButton user={user} amount={amount} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DespositModal;
