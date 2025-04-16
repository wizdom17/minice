"use client";
import { Trade } from "@/actions/trades";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import toast from "react-hot-toast";

const ViewCryptoTrade = ({ trade }: { trade: Trade }) => {
  const [loading, setLoading] = useState({ accept: false, decline: false });
  const [status, setStatus] = useState(trade.status);
  const [amount, setAmount] = useState(0);

  const accept = async () => {
    setLoading((prev) => ({ ...prev, accept: true }));
    const user = await getDoc(doc(db, "users", trade.userId));
    try {
      await updateDoc(doc(db, "trades", trade.id), {
        status: "accepted",
        amount
      });
      await updateDoc(doc(db, "users", trade.userId), {
        balance: user.data()?.balance + Number(amount),
      });
      toast.success("trade accepted");
      setStatus("accepted");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("error accepting trade");
    } finally {
      setLoading((prev) => ({ ...prev, accept: false }));
    }
  };

  const decline = async () => {
    setLoading((prev) => ({ ...prev, decline: true }));
    try {
      await updateDoc(doc(db, "trades", trade.id), {
        status: "declined",
      });
      toast.success("trade declined");
      setStatus("declined");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("error declining trade");
    } finally {
      setLoading((prev) => ({ ...prev, decline: false }));
    }
  };

  return (
    <div className="max-w-3xl rounded-lg p-5 border border-slate-300">
      <div className="grid grid-cols-3">
        {trade.images?.map((item, i) => (
          <img
            key={i}
            src={item}
            alt="trade img"
            className="w-full h-[300px] object-contain"
          />
        ))}
      </div>
      <div className="flex flex-col gap-y-3 mt-5 w-full">
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold">Name</p>
          <p className="text-slate-500">{trade.name}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold">Rate</p>
          <p className="text-slate-500">₦{trade.rate}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold">User</p>
          <p className="text-slate-500">{trade.userEmail}</p>
        </div>
        <div className="">
          <label htmlFor="amount">Amount</label>
          <input
            disabled={trade?.amount !== undefined && Number(trade.amount) > 0}
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="rounded-md ml-3 px-3 border h-12 border-slate-300"
          />
        </div>
      </div>
      <div className="flex items-center justify-center mt-5 gap-x-5">
        {status === "pending" ? (
          <>
            <Button
              className="bg-green-500 cursor-pointer"
              onClick={accept}
              disabled={loading.accept}
            >
              {loading.accept ? "Accepting..." : "Accept"}
            </Button>
            <Button
              className="bg-red-500 cursor-pointer"
              onClick={decline}
              disabled={loading.decline}
            >
              {loading.decline ? "Declining..." : "Decline"}
            </Button>
          </>
        ) : (
          <p className="text-lg font-semibold text-center">
            {status === "accepted" ? "Trade Accepted" : "Trade Declined"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewCryptoTrade;
