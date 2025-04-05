import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-primary-bg pt-40">
      <div className="">
        <div className="flex items-center flex-col justify-between gap-8">
          <div className="lg:w-[80%] w-[90%] flex flex-col items-center justify-between gap-y-9 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-6xl max-w-4xl font-bold font-rubik text-center text-gray-900">
              Sell, Trade & Exchange Gift Cards For Naira
            </h1>
            <p className="text-gray-600 text-xl text-center max-w-xl">
              Sell gift cards from any brand and get instant cash with Prestmit,
              Nigeria's premier gift card trading platform.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href={"/auth/register"}
                className="bg-blue-600 rounded-md hover:bg-blue-700 text-white py-4 flex font-bold px-4 items-center justify-center gap-2 transition duration-200 ease-in-out"
              >
                <p>Register Now</p>
                <MoveRightIcon />
              </Link>
              <div className="flex items-center gap-4">
                <Image
                  src={"/images/qrcode.svg"}
                  alt="qrcode"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="relative md:h-[152px]">
              <img
                src={"/images/giftcards-banner.webp"}
                alt="giftcard-banner"
                className="md:w-auto w-[70rem] h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
