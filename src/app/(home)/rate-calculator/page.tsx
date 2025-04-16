import { fetchGiftcards } from "@/actions/giftcards";
import FAQ from "@/components/sections/FAQ";
import GiftCardCalculator from "@/components/sections/GiftCardCalculator";
import NewsLetter from "@/components/sections/NewsLetter";
import React from "react";

const Page = async () => {
  const { giftcards } = await fetchGiftcards();
  return (
    <div className="">
      {giftcards && <GiftCardCalculator data={giftcards} />}
      <FAQ />
      <NewsLetter />
    </div>
  );
};

export default Page;
