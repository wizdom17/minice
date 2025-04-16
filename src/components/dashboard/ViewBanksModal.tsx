"use client";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { UserData } from "@/actions/user";
import { CiBank } from "react-icons/ci";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const ViewBankModal = ({
  user,
  bank,
  openModal,
  setOpenModal,
}: {
  user: UserData;
  bank: any;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const deleteBank = async () => {
    try {
      const res = await axios.post("/api/delete-bankaccount", {
        accNumber: bank.account_number,
        accName:bank.account_name,
        bankName: bank.bank_name,
        userId: user.id,
      });
      if (res.status === 200) {
        toast.success("bank account deleted susseccfully");
        setOpenModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("couldnt delete bank account");
    }
  };

  return (
    <Sheet open={openModal} onOpenChange={setOpenModal}>
      <SheetContent
        side="right"
        className="w-[350px] lg:w-[450px] overflow-y-auto"
      >
        <SheetHeader className="bg-primary-bg p-7">
          <SheetTitle className="text-2xl font-sans font-semibold">
            My Bank Account
          </SheetTitle>
        </SheetHeader>
        <div className="p-7">
          <div className="bg-colorSecondary cursor-pointer text-white p-4 rounded-md flex flex-col justify-center gap-y-2">
            <CiBank size={30} />
            <div className="flex items-center justify-between">
              <p className="text-xl font-sans font-semibold">
                {bank?.account_number}
              </p>
              <p className="text-xs text-slate-400">Account Number</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 uppercase">
                {bank?.account_name}
              </p>
              <p className="text-xs text-right uppercase text-slate-400">
                {bank?.bank_name}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <p className="font-sans text-slate-500">Account Name</p>
              <p>{bank?.account_name}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <p className="font-sans text-slate-500">Account Number</p>
              <p>{bank?.account_number}</p>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-200">
              <p className="font-sans text-slate-500">Bank Name</p>
              <p>{bank?.bank_name}</p>
            </div>
            <Button
              onClick={deleteBank}
              variant={"ghost"}
              className="text-red-500 px-1 hover:text-red-500 cursor-pointer mt-5"
            >
              Delete Bank
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ViewBankModal;
