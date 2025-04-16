"use client";
import React, { useState } from "react";
import { LuWallet } from "react-icons/lu";
import { TiCancel } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Image from "next/image";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LucideMinusCircle, Mail } from "lucide-react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import { UserData } from "@/actions/user";
import TopUp from "./TopUp";
import WithdrawModal from "./withdrawModal";
import BanModal from "./Ban";

const UserProfile = ({ user }: { user: UserData }) => {
  const dashboardItems = [
    {
      title: "Account balance",
      icon: <LuWallet size={20} />,
      amount: user?.balance,
      color: "bg-[#35449c]",
    },
    {
      title: "Total Deposit",
      icon: <BsArrowDownCircle size={20} />,
      amount: user?.total_deposit,
      color: "bg-[#ffad46]",
    },
    {
      title: "Total Withdrawal",
      icon: <BsArrowUpCircle size={20} />,
      amount: user?.total_withdrawal,
      color: "bg-[#ffad46]",
    },
  ];
  function formatToDollars(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  const [openTopUp, setOpenTopUp] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [openBan, setOpenBan] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  return (
    <div className="flex flex-col-reverse lg:flex-row lg:h-fit gap-x-8">
      <div className="h-fit w-full bg-primary-bg pb-5 rounded-md p-3">
        <div className="grid h-fit w-full gap-7 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          {dashboardItems.map((item, index) => (
            <div
              key={index}
              className="flex p-4 bg-white gap-x-3 items-center justify-between rounded-md h-[90px] col-span-1"
            >
              <div
                className={`flex size-fit text-white items-center justify-center p-2 ${item.color} rounded-md`}
              >
                {item.icon}
              </div>
              <div className="flex justify-center sm:items-end flex-col gap-y-1">
                <p className="text-sm text-muted-400">{item.title}</p>
                {item.title === "Trading Accounts" ? (
                  <p className="">{item.amount}</p>
                ) : (
                  <p className="">{formatToDollars(item.amount as number)}</p>
                )}
              </div>
            </div>
          ))}
          {user.bank_account.map((account, i) => (
            <div
              key={i}
              className="bg-colorSecondary cursor-pointer text-white p-4 rounded-md flex flex-col justify-center gap-y-2"
            >
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
        </div>
        <div className="h-fit px-3 mt-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-7">
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-400">Fiirstname</p>
            <p className="text-slate-500">{user?.firstname}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-400">Lastname</p>
            <p className="text-slate-500">{user?.lastname}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-400 ">Email Address</p>
            <p className="font-semibold text-slate-500 text-wrap">
              {user?.email}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-400 ">Created At </p>
            <p className="text-slate-500">
              {moment(user?.createdAt).format("MMMM Do YYYY, h:mm a")}
            </p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-400">Phone Number</p>
            <p className="font-semibold text-slate-500">{user?.phone}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-muted-400">Country</p>
            <p className="text-slate-500">{user?.country}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 md:w-full mb-5 lg:mb-0 lg:w-[350px] w-full h-[400px] bg-primary-bg rounded-md">
        <div className="flex text-muted-400 w-full items-center justify-center flex-col gap-y-3">
          <Image
            src="/images/user.png"
            alt="profile"
            width={80}
            height={80}
            className="rounded-full object-contain mt-4"
          />
          <div className="flex-col items-center justify-center flex gap-y-1">
            <p>{user?.firstname}</p>
            <p className="text-xs">{user?.email}</p>
            <div
              className={`flex size-fit px-3 py-1 mt-2 text-xs text-light rounded-full ${
                user.status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {user?.status}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 mt-12">
          <Button
            onClick={() => setOpenTopUp(true)}
            className="col-span-1 cursor-pointer flex items-center justify-center gap-x-2 bg-[#35449C] hover:bg-[#35449C]"
          >
            <IoMdAddCircleOutline size={20} />
            <p>Top up</p>
          </Button>
          <Button
            onClick={() => setOpenWithdraw(true)}
            className="col-span-1 cursor-pointer flex items-center justify-center gap-x-2 bg-[#35449C] hover:bg-[#35449C]"
          >
            <LucideMinusCircle size={20} />
            <p>Withdraw</p>
          </Button>
          <Button
            onClick={() => setOpenBan(true)}
            className="col-span-1 cursor-pointer flex items-center justify-center gap-x-2 bg-[#35449C] hover:bg-[#35449C]"
          >
            <TiCancel size={20} />
            <p>{user.status === "active" ? "Ban" : "Unban"}</p>
          </Button>
          <Button
            onClick={() => setOpenMail(true)}
            className="col-span-1 cursor-pointer flex items-center justify-center gap-x-2 bg-[#1d3557] hover:bg-[#1d3557]"
          >
            <Mail size={20} />
            <p>Send mail</p>
          </Button>
        </div>
      </div>
      <TopUp open={openTopUp} setOpen={setOpenTopUp} user={user} />
      <WithdrawModal
        open={openWithdraw}
        setOpen={setOpenWithdraw}
        user={user}
      />
      <BanModal open={openBan} setOpen={setOpenBan} user={user} />
      {/* <TopUp open={openTopUp} setOpen={setOpenTopUp} user={user}/> */}
    </div>
  );
};

export default UserProfile;
