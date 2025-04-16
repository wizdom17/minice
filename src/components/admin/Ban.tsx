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

const BanModal = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserData;
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/ban", {
        user,
      });
      if (res.status === 200) {
        setLoading(false);
        setOpen(false);
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("user banned failed");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[350px] rounded-md border-none bg-white text-light">
        <DialogHeader>
          <DialogTitle>Ban User</DialogTitle>
        </DialogHeader>
        <div className=""></div>
        {loading ? (
          <Button className="bg-red-500 mt-2 hover:bg-red-500" disabled>
            <LoaderCircle className="animate-spin" />
          </Button>
        ) : (
          <Button
            className="bg-red-500 mt-2 hover:bg-red-500"
            onClick={handleSubmit}
          >
            {user.status === "active" ? "Ban" : "Unban"}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default BanModal;
