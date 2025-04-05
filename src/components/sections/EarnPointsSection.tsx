import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigRightDash, MoveRightIcon } from "lucide-react";
import { MdArrowOutward } from "react-icons/md";

const EarnPointsSection = () => {
  return (
    <section className="bg-[#0B2253] text-white relative">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Text Content */}
        <div className="py-14 lg:px-20 md:px-10 px-5 lg:w-1/2">
          <h2 className="lg:text-2xl md:text-[2.5rem] text-[1.3rem] max-w-xl font-bold font-sans mb-6">
            Earn Gift Points On Every Transaction
          </h2>
          <p className="md:text-lg text-[15px] font-medium font-sans mb-8">
            Because we care, we give you rewards on every completed transaction.
            You can always redeem these rewards for cash at anytime.
          </p>
          <div className="gap-x-8 flex items-center">
            <Link
              href={"/auth/register"}
              className="bg-blue-600 rounded-md hover:bg-blue-700 text-white py-4 flex md:w-[250px] w-[180px] font-bold px-4 items-center justify-center gap-2 transition duration-200 ease-in-out"
            >
              <p>Earn Rewards</p>
              <MoveRightIcon />
            </Link>
            <Link
              href={"/auth/register"}
              className="flex items-center gap-2 font-bold md:w-[250px] w-[160px]"
            >
              Learn More
              <MdArrowOutward className="ml-4" />
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 w-full bg-primary-bg">
          <div className="relative w-full">
            <img
              src="/images/ambassador-earn-points.webp"
              alt="Earn points on every transaction"
              className="object-contain h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarnPointsSection;
