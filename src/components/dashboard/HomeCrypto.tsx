"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import QRCode from "react-qr-code";
import { Crypto } from "@/actions/crypto";
import toast from "react-hot-toast";
import { Upload, X } from "lucide-react";
import { Button } from "../ui/button";
import { UserData } from "@/actions/user";

const HomeCrypto = ({
  data,
  crypto,
  user,
}: {
  data: any;
  crypto: Crypto[];
  user: UserData;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<any>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cryptoData = crypto?.find((item) => item.name === selectedCrypto?.name);
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("address copied");
    });
  };
  const handleFileRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0]; // Only take the first file
      setFiles([newFile]); // Replace the files state with the new file
    }
  };

  useEffect(() => {
    setSelectedNetwork(null);
    setFiles([]);
  }, [openModal]);

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("crypto", cryptoData?.name || "");
    formData.append("rate", cryptoData?.rate || "");
    formData.append("chain", selectedNetwork || "");
    formData.append(
      "address",
      cryptoData?.address.find((item) => item.chain === selectedNetwork)
        ?.address || ""
    );
    formData.append("userId", user.id);
    formData.append("userEmail", user.email);

    if (files?.[0]) {
      formData.append("file", files[0]);
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/trade-crypto", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("crypto trade submitted");
        window.location.reload();
      }

      setOpenModal(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting crypto");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 rounded-md bg-secondary-grey">
      <div className="flex justify-between items-center mb-8">
        <h1 className="lg:text-2xl text-lg font-bold font-snas">Crypto</h1>
        <Link href="/dashboard/crypto" className="text-gray-400">
          View All
        </Link>
      </div>

      <div className="space-y-6">
        {data?.slice(0, 3).map((item: any) => (
          <div key={item.id} className="flex items-center justify-between ">
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
                  <span className="text-sm font-bold">{item.name}</span>
                  <span className="text-sm text-gray-500">{item.symbol}</span>
                </div>
              </div>
            </div>

            <div className="text-left w-[100px]">
              <span className="text-sm font-medium">${item.current_price}</span>
            </div>

            <div className="flex items-center gap-2">
              <div
                onClick={() => {
                  setSelectedCrypto(item);
                  setOpenModal(true);
                }}
                className="text-sm cursor-pointer font-medium text-blue-700"
              >
                Trade
              </div>
            </div>
          </div>
        ))}
      </div>
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent className="w-[350px] lg:w-[400px] overflow-y-auto">
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
                <Select onValueChange={(val) => setSelectedNetwork(val)}>
                  <SelectTrigger className="w-full h-14 border-slate-200">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoData?.address.map((item) => (
                      <SelectItem
                        key={item.chain}
                        value={item.chain}
                        className="capitalize"
                      >
                        {item.chain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedNetwork && (
                <div className="mt-10">
                  <div className="flex flex-col items-center justify-center p-10">
                    <div className="w-[150px]">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={
                          cryptoData?.address.find(
                            (item) => item.chain === selectedNetwork
                          )?.address || ""
                        }
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <p className="text-sm text-slate-500 text-center mt-5">
                      Scan this QR code to deposit BTC into your Bitcoin wallet.
                    </p>
                  </div>
                  <div className="p-3 rounded-md border border-slate-200 mt-10">
                    <p>wallet address</p>
                    <div className="flex gap-x-2 mt-2">
                      <input
                        disabled
                        type="text"
                        className="w-full h-14 text-sm text-slate-500 focus:outline-none border border-slate-200 rounded-md px-3"
                        value={
                          cryptoData?.address.find(
                            (item) => item.chain === selectedNetwork
                          )?.address
                        }
                      />
                      <button
                        onClick={() =>
                          handleCopyToClipboard(
                            cryptoData?.address.find(
                              (item) => item.chain === selectedNetwork
                            )?.address || ""
                          )
                        }
                        className="bg-blue-400 cursor-pointer h-14 px-4 rounded-md text-white font-semibold"
                      >
                        copy
                      </button>
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border mt-5 cursor-pointer border-dashed rounded-lg p-6 flex flex-col items-center justify-center border-gray-300"
                  >
                    <div className="bg-gray-100 p-3 rounded-lg mb-3">
                      <Upload className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-blue-500 font-medium">Upload Proof</p>
                    </div>
                  </div>
                  {files.length > 0 && (
                    <div className="mt-4 w-full">
                      <p className="text-sm font-medium mb-2">
                        Uploaded files:
                      </p>
                      <div className="space-y-2 flex flex-wrap gap-4">
                        {files.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-16 h-16 object-cover border rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => handleFileRemove(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex p-5 rounded-md border text-xs my-5 text-orange-400 border-orange-400 bg-amber-200">
                    <p>
                      Please select the correct {cryptoData?.name} network and
                      send only
                      {cryptoData?.symbol} to the address as coins sent to the
                      wrong address or network cannot be retrieved
                    </p>
                  </div>
                  <Button
                    disabled={submitting}
                    onClick={handleSubmit}
                    className="h-12 cursor-pointer w-full mb-5 hover:bg-blue-500 bg-blue-500"
                  >
                    {submitting ? "Submiting..." : "Submit"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HomeCrypto;
