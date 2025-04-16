import { fetchCrypto } from "@/actions/crypto";
import { ticker } from "@/actions/ticker";
import CryptoCurrencies from "@/components/admin/Crypto";
import { Search } from "lucide-react";
import React from "react";

const Page = async () => {
  const { data } = await ticker();
  const { crypto } = await fetchCrypto();
  return (
    <div className="text-colorSecondary">
      <div className="flex lg:flex-row flex-col lg:items-center gap-y-4 lg:justify-between">
        <p className="text-lg font-sans font-semibold">Trade Crypto</p>
        <div className="flex border border-slate-300 rounded-md p-3 items-center justify-between">
          <Search />
          <input
            type="text"
            className="border-none focus:outline-none rounded-md px-2 py-1 lg:w-xs w-full"
            placeholder="Search crypto"
          />
        </div>
      </div>
      {crypto && <CryptoCurrencies crypto={crypto} data={data} />}
    </div>
  );
};

export default Page;
