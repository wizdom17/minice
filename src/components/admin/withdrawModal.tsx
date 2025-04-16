import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { UserData } from "@/actions/user";
import toast from "react-hot-toast";

const WithdrawModal = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserData;
}) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/withdraw", {
        user,
        amount,
      });
      if (res.status === 200) {
        setLoading(false);
        setOpen(false);
        setAmount(0);
        toast.success("Withdraw successful");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("withdraw failed");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[350px] rounded-md border-none bg-white text-light">
        <DialogHeader>
          <DialogTitle>Withdraw balance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} action="">
          <label htmlFor="amount" className="text-muted-400">
            Amount
          </label>
          <input
            required
            onChange={(e) => setAmount(Number(e.target.value))}
            min={10}
            type="number"
            name="amount"
            id="amount"
            className="w-full px-2 mt-2 h-10 border border-muted-300 outline-none rounded-md bg-inherit focus:ring-2 ring-blue-500"
          />
          {loading ? (
            <Button
              className="bg-blue-500 mt-5 hover:bg-blue-500 w-full"
              disabled
            >
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button
              className="bg-blue-500 mt-5 hover:bg-blue-500 w-full"
              type="submit"
            >
              Withdraw
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default WithdrawModal;
