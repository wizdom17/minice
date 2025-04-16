"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserData } from "@/actions/user";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

export default function PersonalInformationForm({ user }: { user: UserData }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    setPhoneNumber(user.phone);
  }, []);
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 text-colorSecondary md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="font-medium">
            Full Name
          </label>
          <Input
            id="fullName"
            value={user.firstname + " " + user.lastname}
            readOnly
            className="h-14 bg-gray-50 text-gray-600"
          />
        </div>

        {/* User ID */}
        <div className="space-y-2">
          <label htmlFor="userId" className="font-medium">
            User ID
          </label>
          <div className="relative">
            <Input
              id="userId"
              value={user.id}
              readOnly
              className="h-14 bg-gray-50 text-gray-600 pr-12"
            />
          </div>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="font-medium">
            Phone Number
          </label>
          <div className="relative">
            <Input
              id="username"
              value={phoneNumber}
              readOnly
              className="h-14 bg-gray-50 text-gray-600 pr-16"
            />
            <Button
              onClick={() => setOpenModal(true)}
              variant="ghost"
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 font-medium"
            >
              Edit
            </Button>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <div className="relative">
            <Input
              id="email"
              value={user.email}
              readOnly
              className="h-14 bg-gray-50 text-gray-600 pr-16"
            />
          </div>
        </div>
      </div>
      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent
          side="right"
          className="w-[350px] lg:w-[450px] overflow-y-auto"
        >
          <SheetHeader className="bg-primary-bg p-7">
            <SheetTitle className="text-2xl font-sans font-semibold">
              Update Phone Number
            </SheetTitle>
          </SheetHeader>
          <div className="p-7">
            <div className="flex items-center rounded-md border border-slate-300">
              <div className="p-2 h-12 border-r border-slate-300">+234</div>
              <input
                minLength={10}
                className="w-full px-3 focus:outline-none border-none h-12"
                maxLength={10}
                type="text"
              />
            </div>
            <Button className="w-full bg-blue-500 cursor-pointer hover:bg-blue-500 h-12 mt-5">Update</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
