import { fetchCrypto } from "@/actions/crypto";
import { ticker } from "@/actions/ticker";
import { fetchTrades } from "@/actions/trades";
import { fetchTransactions, fetchUser } from "@/actions/user";
import Balance from "@/components/dashboard/Balance";
import HomeCrypto from "@/components/dashboard/HomeCrypto";
import TradesTable from "@/components/dashboard/RecentTrades";
import TransactionTable from "@/components/dashboard/RecentTransactions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShare } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { TbGiftCard } from "react-icons/tb";

const Page = async () => {
  const { data } = await ticker();
  const { crypto } = await fetchCrypto();
  const { user } = await fetchUser();
  const { transactions } = await fetchTransactions();
  const { trades } = await fetchTrades();
  return (
    <div className="">
      <div className="grid text-colorSecondary grid-cols-1 lg:grid-cols-2 gap-7">
        {user && <Balance user={user} />}
        <div className="p-6 flex flex-col items-center justify-center gap-y-3 rounded-md bg-secondary-grey">
          <p className="text-2xl font-sans text-colorSecondary">Gift Cards</p>
          <div className="bg-white p-5 rounded-full">
            <TbGiftCard className="text-blue-500" size={50} />
          </div>
          <Link
            className="w-[150px] flex items-center justify-center py-3 gap-x-3 bg-blue-500 rounded-md text-center text-white"
            href={"/dashboard/gift-cards"}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <FaArrowRightArrowLeft />
            </div>
            <span className="text-lg font-medium">Start Trade</span>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid gap-7 grid-cols-1 lg:grid-cols-2 text-colorSecondary">
        {crypto && user && <HomeCrypto user={user} crypto={crypto} data={data} />}
        <div className="py-6 rounded-md px-10 flex flex-col gap-y-4 items-center justify-center bg-secondary-grey">
          <Image
            src={"/images/referral-gift-icon.svg"}
            alt="referral icons"
            width={60}
            height={60}
            className="object-contain"
          />
          <p className="font-medium font-sans">
            Refer your friends and earn{" "}
            <span className="text-green-400">2000 Gift Points!</span>
          </p>
          <p className="text-sm text-center max-w-sm font-sans text-slate-400">
            Earn referral bonus when your friends sign up with your referral
            code and trade successfully.
          </p>
          <div className="flex gap-x-14">
            <div className="w-28 h-9 flex items-center justify-center text-sm bg-white rounded-md">
              <p>M17764PQ</p>
            </div>
            <div className="w-20 h-9 flex items-center bg-white text-blue-500 justify-center gap-x-3 rounded-md">
              <FaShare />
              <p>share</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 p-6 bg-secondary-grey text-colorSecondary">
        <p>Recent Transactions</p>
        {transactions && <TransactionTable data={transactions} />}
      </div>
      <div className="mt-8 p-6 bg-secondary-grey text-colorSecondary">
        <p>Recent Trades</p>
        {trades && <TradesTable data={trades} />}
      </div>
    </div>
  );
};

export default Page;
