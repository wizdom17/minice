"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import Image from "next/image";
import { Crypto } from "@/actions/crypto";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const CryptoCurrencies = ({
  data,
  crypto,
}: {
  data: any;
  crypto: Crypto[];
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  const [rate, setRate] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const cryptoData = crypto.find((item) => item.name === selectedCrypto?.name);
  useEffect(() => {
    if (cryptoData != undefined) {
      setRate(Number(cryptoData.rate));
    }
  }, [selectedCrypto, cryptoData]);

  const handelUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/update-crypto", {
        name: selectedCrypto.name,
        rate,
      });
      if (res.status === 200) {
        setLoading(false);
        toast.success("rate updated");
        setOpenModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("rate failed to update");
    }
  };
  return (
    <div className="grid mt-10 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {data.map((coin: any) => (
        <div
          onClick={() => {
            setSelectedCrypto(coin);
            setOpenModal(true);
          }}
          key={coin.id}
          className="flex cursor-pointer flex-col items-center justify-center p-4 border rounded-lg hover:shadow-md"
        >
          <img src={coin.image} alt={coin.name} className="w-16 h-16 mb-2" />
          <h3 className="text-lg font-semibold">{coin.name}</h3>
          <p className="text-gray-500">{coin.symbol.toUpperCase()}</p>
          <p className="font-bold">${coin.current_price}</p>
        </div>
      ))}
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
              <div className="flex flex-col gap-y-2">
                <label htmlFor="rate" className="text-sm text-slate-500">
                  Rate
                </label>
                <input
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  type="number"
                  name="rate"
                  className="h-12 focus:outline-blue-500 text-sm px-3 bg-primary-bg rounded-md"
                />
              </div>
              <div className="mt-8">
                {loading ? (
                  <Button
                    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500 h-12"
                    disabled
                  >
                    <LoaderCircle className="animate-spin" />
                  </Button>
                ) : (
                  <Button
                    onClick={handelUpdate}
                    className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500 h-12"
                  >
                    Update
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CryptoCurrencies;
