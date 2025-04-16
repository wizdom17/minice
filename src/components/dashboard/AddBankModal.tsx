"use client";
import React, { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { UserData } from "@/actions/user";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { IoIosArrowDown } from "react-icons/io";
import { Bank } from "@/actions/banks";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const AddBankModal = ({
  user,
  banks,
  openModal,
  setOpenModal,
}: {
  user: UserData;
  banks: Bank[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [accNumber, setAccNumber] = useState<string>("");
  const [accName, setAccName] = useState("");
  const [openBanks, setOpenBanks] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const bankRef = useRef<HTMLDivElement>(null);
  const [verifying, setVerifying] = useState(false);
  const [saving, setSaving] = useState(false);

  // handle click outside the bank box
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openBanks &&
        bankRef.current &&
        !bankRef.current.contains(event.target as Node)
      ) {
        setOpenBanks(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openBanks]);

  const filteredBanks = banks.filter((bank) =>
    bank.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const verifyAccount = async () => {
    setVerifying(true);
    try {
      const res = await axios.post("/api/verify-bank", {
        accNumber,
        bank_code: selectedBank?.code,
      });
      if (res.status === 200) {
        setVerifying(false);
        setAccName(res.data.data.account_name);
      }
    } catch (error) {
      setVerifying(false);
      console.log(error);
      toast.error("failed to resolve bank info");
    }
  };

  useEffect(() => {
    if (accNumber.length === 10 && selectedBank) {
      verifyAccount();
    }
  }, [accNumber, selectedBank]);

  useEffect(() => {
    setAccNumber("");
    setAccName("");
    setSearchTerm("");
    setSelectedBank(null);
  }, [openModal]);

  const saveBank = async () => {
    setSaving(true);
    try {
      const res = await axios.post("/api/add-bankaccount", {
        accNumber,
        accName,
        bankName: selectedBank?.name,
        userId: user.id
      });
      if (res.status === 200) {
        toast.success("bank account added susseccfully");
        setSaving(false);
        setOpenModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("couldnt add bank account");
      setSaving(false);
    }
  };

  return (
    <Sheet open={openModal} onOpenChange={setOpenModal}>
      <SheetContent
        side="right"
        className="w-[350px] lg:w-[450px] overflow-y-auto"
      >
        <SheetHeader className="bg-primary-bg p-7">
          <SheetTitle className="text-2xl font-sans font-semibold">
            Add Bank Account
          </SheetTitle>
        </SheetHeader>
        <div className="p-7">
          <p className="text-sm font-sans text-slate-500">
            Add a bank account that you can use for withdrawals. Be sure to only
            add accounts you have easy access to.
          </p>
          <div className="mt-5">
            <div className="flex flex-col gap-2">
              <label
                className="text-sm text-slate-500"
                htmlFor="account_number"
              >
                Account Number
              </label>
              <input
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, ""); // remove non-digits
                  if (val.length <= 10) setAccNumber(val);
                }}
                value={accNumber}
                type="text"
                inputMode="numeric"
                pattern="^\d{10}$"
                maxLength={10}
                id="account_number"
                placeholder="0000000000"
                className="border border-gray-300 h-12 focus:border-none rounded-md p-2 focus:outline-blue-500"
              />
            </div>
            <div className="relative mt-5">
              <p className="text-sm text-slate-500">Bank Name</p>

              <div className="relative">
                <div
                  className="border border-slate-300 rounded-lg p-4 h-12 mt-2 flex justify-between items-center cursor-pointer"
                  onClick={() => setOpenBanks(!openBanks)}
                >
                  {selectedBank ? (
                    <span className="text-slate-800 text-sm font-medium">
                      {selectedBank.name}
                    </span>
                  ) : (
                    <span className="text-slate-800 font-medium">
                      Select Bank
                    </span>
                  )}

                  <IoIosArrowDown />
                </div>
                {openBanks && (
                  <div
                    ref={bankRef}
                    className="absolute left-0 h-[300px] overflow-y-auto right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-10"
                  >
                    <div className="p-3">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search"
                          className="pl-3 pr-10 py-2 w-full text-slate-600"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute right-3 top-2.5 h-5 w-5 text-slate-500" />
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                      {filteredBanks.map((bank: any) => (
                        <div
                          key={bank.id}
                          className="px-4 py-5 hover:bg-slate-50 text-sm cursor-pointer text-slate-800 font-medium"
                          onClick={() => {
                            setOpenBanks(false);
                            setSelectedBank(bank);
                          }}
                        >
                          {bank.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <label className="text-sm text-slate-500" htmlFor="account_name">
                Account Name
              </label>
              <input
                onChange={(e) => setAccName(e.target.value)}
                type="text"
                id="account_name"
                value={accName}
                disabled
                placeholder=""
                className="border border-gray-300 focus:border-none h-12 rounded-md p-2 focus:outline-blue-500"
              />
            </div>
            <div className="mt-5 w-full">
              {!verifying ? (
                <Button
                  onClick={saveBank}
                  disabled={!accNumber || !selectedBank || saving}
                  className="h-12 bg-blue-500 w-full cursor-pointer hover:bg-blue-500"
                >
                  {saving ? "Saving..." : "Save Bank Account"}
                </Button>
              ) : (
                <Button
                  disabled
                  className="h-12 w-full bg-blue-500 hover:bg-blue-500"
                >
                  Verifying...
                </Button>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddBankModal;
