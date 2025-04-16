import { fetchGiftcards } from "@/actions/giftcards";
import { fetchUser } from "@/actions/user";
import Giftcards from "@/components/dashboard/Giftcards";
import { Search } from "lucide-react";
import React from "react";

const Page = async () => {
  const { giftcards } = await fetchGiftcards();
  const { user } = await fetchUser();
  return (
    <div className="text-colorSecondary">
      <div className="flex lg:flex-row flex-col lg:items-center gap-y-4 lg:justify-between">
        <p className="text-lg font-sans font-semibold">Trade Giftcards</p>
        <div className="flex border border-slate-300 rounded-md p-3 items-center justify-between">
          <Search />
          <input
            type="text"
            className="border-none focus:outline-none rounded-md px-2 py-1 lg:w-xs w-full"
            placeholder="Search Giftcards"
          />
        </div>
      </div>
      {giftcards && user && <Giftcards user={user} giftcards={giftcards} />}
    </div>
  );
};

export default Page;
