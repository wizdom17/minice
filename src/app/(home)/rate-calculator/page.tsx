import FAQ from "@/components/sections/FAQ";
import GiftCardCalculator from "@/components/sections/GiftCardCalculator";
import NewsLetter from "@/components/sections/NewsLetter";
import React from "react";

const Page = () => {
  return (
    <div className="">
      <GiftCardCalculator />
      <FAQ />
      <NewsLetter />
    </div>
  );
};

export default Page;
