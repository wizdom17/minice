"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const HomeCrypto = ({ data }: { data: any }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  return (
    <div className="p-6 rounded-md bg-secondary-grey">
      <div className="flex justify-between items-center mb-8">
        <h1 className="lg:text-2xl text-lg font-bold font-snas">Crypto</h1>
        <Link href="#" className="text-gray-400">
          View All
        </Link>
      </div>

      <div className="space-y-6">
        {data.slice(0, 3).map((item: any) => (
          <div
            key={item.id}
            onClick={() => setSelectedCrypto(item)}
            className="flex items-center justify-between "
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.id}
                  height={30}
                  width={30}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 w-[100px]">
                  <span className="md:text-lg text-sm font-bold">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-500">{item.symbol}</span>
                </div>
              </div>
            </div>

            <div className="text-left w-[100px]">
              <span className=" font-medium">${item.current_price}</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                onClick={() => setOpenModal(true)}
                className="text-sm cursor-pointer font-medium text-blue-700"
              >
                Trade
              </div>
            </div>
          </div>
        ))}
      </div>
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent className="w-[300px] lg:w-[400px] overflow-y-auto">
          <SheetHeader className="bg-primary-bg p-7">
            <SheetTitle className="text-2xl font-sans font-semibold">
              Trade Crypto
            </SheetTitle>
          </SheetHeader>
          <div className="px-5">
            <div className="bg-primary-bg p-3 rounded-md  flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                {selectedCrypto && (
                  <Image
                    src={selectedCrypto?.image || ""}
                    alt={selectedCrypto?.name}
                    height={30}
                    width={30}
                    className="object-contain"
                  />
                )}

                <p>
                  <span className="font-semibold">{selectedCrypto?.name}</span>
                  <span className="text-sm ml-1">{selectedCrypto?.symbol}</span>
                </p>
              </div>
              <p className="text-slate-600">${selectedCrypto?.current_price}</p>
            </div>
            <div className="mt-10">
              <div>
                <Label className="block text-slate-500 mb-2">
                  Select Network
                </Label>
                <Select>
                  <SelectTrigger className="w-full h-14 border-slate-200">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bitcoin">Bitcoin</SelectItem>
                    <SelectItem value="erc-20">ERC-20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-3 rounded-md border border-slate-200 mt-10">
                <p>wallet address</p>
                <div className="flex mt-2">
                  <input
                    disabled
                    type="text"
                    className="w-full h-14 focus:outline-none border border-slate-200 rounded-md px-3"
                    placeholder="Enter wallet address"
                  />
                  <button className="bg-blue-400 cursor-pointer h-14 px-4 rounded-md text-white font-semibold">
                    copy
                  </button>
                </div>
                <div className="flex px-3 mt-2 items-center justify-between text-sm font-sans">
                  <p className="text-orange-400">minimum deposit</p>
                  <p>0.00004 BTC</p>
                </div>
              </div>
              <div className="flex p-5 rounded-md border text-xs mt-10 text-orange-400 border-orange-400 bg-amber-200">
                <p>
                  Please select the correct BITCOIN network and send only BTC to
                  the address as coins sent to the wrong address or network
                  cannot be retrieved
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HomeCrypto;
