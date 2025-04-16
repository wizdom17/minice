"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { UserData } from "@/actions/user";
import { IoIosAddCircleOutline, IoMdArrowDropdown } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const WithdrawModal = ({
  user,
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserData;
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [showBankAccounts, setShowBankAccounts] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<
    null | UserData["bank_account"][0]
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowBankAccounts(false);
      }
    };

    if (showBankAccounts) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showBankAccounts]);

  useEffect(() => {
    setSelectedBank(null);
    setAmount(0);
    setShowBankAccounts(false);
  }, [openModal]);

  const router = useRouter();
  const handleWithdraw = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/withdrawal", {
        user,
        amount,
        selectedBank,
      });
      if (res.status === 200) {
        setLoading(false);
        toast.success("Withdrawal Submitted");
        setOpenModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An error occurred while processing your request");
    }
  };

  return (
    <Sheet open={openModal} onOpenChange={setOpenModal}>
      <SheetContent
        side="right"
        className="w-[300px] lg:w-[400px] overflow-y-auto"
      >
        <SheetHeader className="bg-primary-bg p-7">
          <SheetTitle className="text-2xl font-sans font-semibold">
            Withdrawal
          </SheetTitle>
        </SheetHeader>
        <div className="px-3 lg:p-7">
          <div className="flex items-center justify-between text-sm font-sans font-medium bg-primary-bg p-3 rounded-md">
            <p>Balance</p>
            <p>₦{user.balance.toLocaleString()}</p>
          </div>
          <div className="flex flex-col mt-5 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <input
                onChange={(e) => setAmount(Number(e.target.value))}
                type="number"
                id="amount"
                placeholder="Enter amount"
                className="border border-gray-300 focus:border-none rounded-md h-12 p-2 focus:outline-blue-500"
              />
              <div className="flex px-1 items-center justify-between text-xs font-sans font-medium text-gray-500">
                <p>Minimum Withdrawal</p>
                <p>₦1000</p>
              </div>
            </div>

            {/* Bank Account Selector */}
            <div className="flex flex-col relative mt-7" ref={dropdownRef}>
              <p className="text-sm font-medium">Bank Account</p>
              <div
                className="h-14 px-3 mt-2 cursor-pointer flex items-center justify-between text-sm font-sans font-medium rounded-md border border-gray-300"
                onClick={() => setShowBankAccounts((prev) => !prev)}
              >
                {selectedBank ? (
                  <div className="flex flex-col">
                    <p className="uppercase text-xs font-semibold">
                      {selectedBank.account_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedBank.account_number}
                    </p>
                  </div>
                ) : (
                  <p>Select Bank Account</p>
                )}
                <IoMdArrowDropdown className="ml-2" />
              </div>

              {showBankAccounts && (
                <div className="absolute font-sans left-0 right-0 top-[80px] mt-2 z-10 w-full h-fit max-h-[250px] overflow-y-auto p-4 bg-white rounded-md shadow-md border border-gray-200">
                  {user.bank_account.map((account, i) => (
                    <div
                      key={i}
                      className="flex flex-col border border-slate-300 rounded-md my-2 gap-y-2 px-4 py-2 hover:border-blue-500 cursor-pointer"
                      onClick={() => {
                        setSelectedBank(account);
                        setShowBankAccounts(false);
                      }}
                    >
                      <p className="uppercase font-semibold">
                        {account.account_name}
                      </p>
                      <p className="text-slate-600 uppercase">
                        {account.bank_name}
                      </p>
                      <p className="text-slate-600">{account.account_number}</p>
                    </div>
                  ))}
                  <Button onClick={()=>router.push("/dashboard/bank-accounts")} className="mt-2 w-full cursor-pointer text-colorSecondary flex items-center justify-center gap-x-1 bg-primary-bg hover:bg-primary-bg rounded-md">
                    <IoIosAddCircleOutline size={30} />
                    <p className="text-sm font-medium">Add Bank Account</p>
                  </Button>
                </div>
              )}
            </div>
            {loading ? (
              <Button
                disabled
                className="bg-blue-500 cursor-pointer hover:bg-blue-500 h-12"
              >
                proccessing...
              </Button>
            ) : (
              <Button
                onClick={handleWithdraw}
                disabled={
                  amount < 1000 || amount > user.balance || !selectedBank
                }
                className="bg-blue-500 cursor-pointer hover:bg-blue-500 h-12"
              >
                Withdraw
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default WithdrawModal;
