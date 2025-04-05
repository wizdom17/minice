import { MoveRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const WhyChooseSection = () => {
  return (
    <section className="py-28 lg:px-20 md:px-10 px-5 bg-white">
      <div className="container flex flex-col items-center xl:items-start lg:items-center lg:flex-row lg:justify-between gap-[40px] md:gap-[34px]">
        <div className="lg:w-[573px] flex-1">
          <h2 className="text-colorSecondary font-[700] font-sans text-[1.36rem] leading-[32px] tracking-[0.22px] md:text-[2.5rem] md:leading-[40px] lg:leading-[52px] md:tracking-[0px] xl:w-[489px]">
            Why Redeem Gift Cards Online In Nigeria With Prestmit?
          </h2>
          <div className="max-w-3xl mx-auto my-7 space-y-6 lg:text-lg text-[15px] text-colorSecondary font-medium font-sans">
            <p className="xl:w-[553px]">
              It's not unusual to receive gift cards you do not want or even
              need from friends and colleagues. You may receive gift cards that
              do not match your personal wants or needs. For example, receiving
              a Steam gift card when you're not a gamer means you have an idle
              gift card. IDLE, not useless.
            </p>
            <p>
              You can sell gift cards for naira on Prestmit, for cedis or mobile
              money, or for cryptocurrency (bitcoin, or USDT), anytime,
              anywhere, including but not limited to Google Play, Steam Wallet,
              iTunes, Apple, AMEX, Vanilla, Best Buy, Footlocker, GameStop,
              Netflix, Macy, Nike, Nordstrom, Sephora, OffGamers, eBay, Razer
              Gold, Saks, Amazon, Target, Visa, Walmart, Xbox etc.
            </p>
            <p className="xl:w-[553px]">
              At Prestmit, we delight in helping you profit from cryptocurrency
              and gift card trades and making your daily life easy with easy
              payments. Our rates are always up to date in line with market
              trends. With our simple platform, affordable fees and instant
              payments, you can carry on with your jolly good life. Cool, right?
            </p>
          </div>
          <div className="mt-12">
            <Link
              className="bg-blue-600 text-white font-bold p-4 w-[280px] flex gap-x-2.5 rounded-md"
              href={"#"}
            >
              <p>Check Gift Card Rates</p>
              <MoveRightIcon />
            </Link>
          </div>
        </div>
        <div className="flex-1 sm:w-[70%] md:w-[60%] lg:w-[544px]">
          <div className="w-full ">
            {/* Placeholder for an image or graphic */}
            <img
              src="/images/exchange-app.webp"
              alt="Why Choose Prestmit"
              className="object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
