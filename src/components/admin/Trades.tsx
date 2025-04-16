"use client";
import { Trade } from "@/actions/trades";
import React, { useState } from "react";
import GiftCardTradesTable from "./GiftCardTradesTable";
import { TbGiftCard } from "react-icons/tb";
import { FaBitcoin } from "react-icons/fa";
import CryptoTradesTable from "./CryptoTradeTable";

const Trades = ({ trades }: { trades: Trade[] }) => {
  const [activeTab, setActiveTab] = useState("giftcards");
  const giftcardsTrades = trades.filter((g) => g.type === "giftcard");
  const cryptoTrades = trades.filter((g) => g.type === "crypto");

  const changeTab = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div>
      <div className="flex mb-5">
        <div
          onClick={() => changeTab("giftcards")}
          className={`flex ${
            activeTab === "giftcards" && "border-b-2"
          } border-blue-500 py-2 px-4 items-center cursor-pointer justify-center gap-x-3`}
        >
          <p>Gift Card</p>
          <TbGiftCard />
        </div>
        <div
          onClick={() => changeTab("crypto")}
          className={`flex ${
            activeTab === "crypto" && "border-b-2"
          } border-blue-500 py-2 px-4 items-center cursor-pointer justify-center gap-x-3`}
        >
          <p>Crypto</p>
          <FaBitcoin />
        </div>
      </div>
      {activeTab === "giftcards" ? (
        <GiftCardTradesTable data={giftcardsTrades} />
      ) : (
        <CryptoTradesTable data={cryptoTrades} />
      )}
    </div>
  );
};

export default Trades;
