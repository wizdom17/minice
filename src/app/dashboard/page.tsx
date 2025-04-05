import { ticker } from "@/actions/ticker";
import HomeCrypto from "@/components/dashboard/HomeCrypto";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMinusCircle, FaPlusCircle, FaShare } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { TbGiftCard } from "react-icons/tb";

const Page = async () => {
  const { data } = await ticker();
  return (
    <div className="">
      <div className="grid text-colorSecondary grid-cols-1 lg:grid-cols-2 gap-7">
        <div className="p-6 rounded-md bg-secondary-grey">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-normal text-gray-500">
              Total Balance
            </h2>
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
              <span className="font-normal">₦</span>0
            </h1>
          </div>

          <div className="grid grid-cols-3 gap-4">
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
        <div className="p-6 flex flex-col items-center justify-center gap-y-3 rounded-md bg-secondary-grey">
          <p className="text-2xl font-sans text-colorSecondary">Gift Cards</p>
          <div className="bg-white p-5 rounded-full">
            <TbGiftCard className="text-blue-500" size={50} />
          </div>
          <Link
            className="px-16 flex items-center justify-center py-3 bg-blue-500 rounded-md text-center text-white"
            href={"/dashboard/gift-cards"}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <FaArrowRightArrowLeft />
            </div>
            <span className="text-lg font-medium">Trade</span>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid gap-7 grid-cols-1 lg:grid-cols-2 text-colorSecondary">
        <HomeCrypto data={data} />
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
      <div className="mt-8 p-6 h-[20rem] bg-secondary-grey text-colorSecondary">
        <p>Recent Transactions</p>
        <div className="flex items-center h-full justify-center">
          <div className="flex flex-col items-center justify-center gap-y-3">
            <Image
              src={"/images/no-history.svg"}
              alt="no history"
              width={60}
              height={60}
              className="object-contain"
            />
            <p className="font-medium font-sans">No transaction record</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
