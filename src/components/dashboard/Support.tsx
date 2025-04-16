"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight, Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "@/actions/user";

const Support = ({ user }: { user: UserData }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/support", {
        message,
        subject,
        userId: user.id,
        userEmail: user.email,
      });
      if (res.status === 200) {
        toast.success("message submitted successfully");
        setLoading(false);
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      setLoading(false);
      toast.error("an error occured");
    }
  };
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 mt-10">
      <div className=" ">
        {/* <p className="text-lg text-gray-500 mb-8">
          You can reach us via the following channels
        </p> */}

        <div className="space-y-4 bg-secondary-grey">
          {/* Email Contact */}
          <Link href="mailto:help@prestmit.com">
            <div className="flex items-center justify-between bg-[#f8f9fa] p-6 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-[#0a2158]">
                  <Mail size={24} />
                </div>
                <div className="ml-6">
                  <p className="text-gray-400 text-sm">Email Address</p>
                  <p className="text-[#0a2158] font-medium">
                    help@minice.com
                  </p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </Link>

          {/* Facebook */}
          <Link href="#">
            <div className="flex items-center justify-between bg-[#f8f9fa] p-6 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-[#0a2158]">
                  <Facebook size={24} />
                </div>
                <div className="ml-6">
                  <p className="text-gray-400 text-sm">Social Media</p>
                  <p className="text-[#0a2158] font-medium">Facebook</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </Link>

          {/* Twitter */}
          <Link href="#">
            <div className="flex items-center justify-between bg-[#f8f9fa] p-6 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-[#0a2158]">
                  <Twitter size={24} />
                </div>
                <div className="ml-6">
                  <p className="text-gray-400 text-sm">Social Media</p>
                  <p className="text-[#0a2158] font-medium">Twitter</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </Link>

          {/* Instagram */}
          <Link href="#">
            <div className="flex items-center justify-between bg-[#f8f9fa] p-6 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 flex items-center justify-center text-[#0a2158]">
                  <Instagram size={24} />
                </div>
                <div className="ml-6">
                  <p className="text-gray-400 text-sm">Social Media</p>
                  <p className="text-[#0a2158] font-medium">Instargram</p>
                </div>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </Link>
        </div>
      </div>
      <div className="border border-slate-200 px-6 py-4 rounded-md">
        <div className="flex flex-col items-center">
          <form onSubmit={onSubmit} className="w-full">
            <div className="flex flex-col">
              <label htmlFor="subject">Subject</label>
              <input
                onChange={(e) => setSubject(e.target.value)}
                required
                value={subject}
                name="subject"
                type="text"
                className="h-12 rounded-md border border-slate-300 px-3 focus:outline-blue-500"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="message">Message</label>
              <Textarea
                value={message}
                required
                name="subject"
                onChange={(e) => setMessage(e.target.value)}
                className="h-[200px]"
              />
              <Button
                disabled={loading}
                type="submit"
                className="bg-blue-500 text-white w-full cursor-pointer hover:bg-blue-500 mt-4"
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
