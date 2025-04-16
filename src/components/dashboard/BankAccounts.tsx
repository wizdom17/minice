"use client";
import { UserData } from "@/actions/user";
import React, { useState } from "react";
import { CiBank } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import AddBankModal from "./AddBankModal";
import { Bank } from "@/actions/banks";
import ViewBankModal from "./ViewBanksModal";

const BankAccounts = ({ user, banks }: { user: UserData; banks: Bank[] }) => {
  const [openModal, setOpenModal] = useState(false);
  const [viewBank, setViewBank] = useState(false);
  const [clickedBank, setClickedBank] = useState<any>(null);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-8 border border-slate-300 p-4 rounded-lg mt-5 max-w-3xl">
      <div
        onClick={() => setOpenModal(true)}
        className="border-dashed h-[140px] font-sans text-blue-500 cursor-pointer border border-blue-400 p-4 rounded-md flex flex-col items-center justify-center gap-y-3"
      >
        <FaCirclePlus size={20} />
        <p className="text-sm">Add Bank Account</p>
      </div>
      {user.bank_account.map((account, i) => (
        <div
          onClick={() => {
            setClickedBank(account);
            setViewBank(true);
          }}
          key={i}
          className="bg-colorSecondary cursor-pointer text-white p-4 rounded-md flex flex-col justify-center gap-y-2"
        >
          <CiBank size={30} />
          <div className="flex items-center justify-between">
            <p className="text-xl font-sans font-semibold">
              {account.account_number}
            </p>
            <p className="text-xs text-slate-400">Account Number</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 uppercase">
              {account.account_name}
            </p>
            <p className="text-xs text-right uppercase text-slate-400">
              {account.bank_name}
            </p>
          </div>
        </div>
      ))}
      <AddBankModal
        banks={banks}
        user={user}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
      <ViewBankModal
        openModal={viewBank}
        setOpenModal={setViewBank}
        user={user}
        bank={clickedBank}
      />
    </div>
  );
};

export default BankAccounts;
