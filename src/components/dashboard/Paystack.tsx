"use client";
import React, { useState } from "react";
import { UserData } from "@/actions/user";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";

export const PaystackButton = ({
  user,
  amount,
}: {
  user: UserData;
  amount: number;
}) => {
  const [loading, setLoading] = useState(false);
  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };

  // you can call this function anything
  const onSuccess = async (reference: string) => {
    try {
      const res = await axios.post("/api/deposit", {
        reference,
        amount,
        user,
      });
      if (res.status === 200) {
        toast.success("deposit successfull");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  // you can call this function anything
  const onClose = () => {
    toast.error("payment cancelled");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <Button
        onClick={() => {
          initializePayment({ onSuccess, onClose });
        }}
        className="bg-blue-500 py-3 hover:bg-blue-500 h-12 cursor-pointer text-white w-full rounded-md"
        disabled={amount < 1000 || loading}
      >
        {loading ? "Loading..." : "Deposit"}
      </Button>
    </div>
  );
};
