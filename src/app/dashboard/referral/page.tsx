import Image from "next/image";
import React from "react";
import { FaShare } from "react-icons/fa";

const Page = () => {
  return (
    <div>
      <p className="text-2xl text-colorSecondary font-sans font-semibold">
        Referrals
      </p>
      <div className="flex gap-x-7 flex-col lg:flex-row mt-10 lg:mt-20">
        <div className="py-6 lg:w-[500px] w-full h-[400px] rounded-md px-6 flex flex-col gap-y-4 items-center justify-center bg-secondary-grey">
          <Image
            src={"/images/referral-gift-icon.svg"}
            alt="referral icons"
            width={60}
            height={60}
            className="object-contain"
          />
          <p className="font-medium text-center font-sans">
            Refer your friends and earn{" "}
            <span className="text-green-400">2000 Gift Points!</span>
          </p>
          <p className="text-sm text-center max-w-md font-sans text-slate-400">
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
        <div className="w-full h-[400px] rounded-md px-10 border border-slate-300 flex flex-col gap-y-3 items-center justify-center">
          <Image
            src={"/images/referral-recycle-bin.svg"}
            alt="no history"
            width={60}
            height={60}
            className="object-contain"
          />
          <p className="text-colorSecondary text-sm">No referral history</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
