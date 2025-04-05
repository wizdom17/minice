import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChevronRight, Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { Textarea } from "../ui/textarea";

const Support = () => {
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
                    help@prestmit.com
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
      <div className="border border-slate-200 px-6 pt-20 rounded-md">
        <div className="flex flex-col items-center">
          <Textarea className="h-[200px]"/>
          <Button className="bg-blue-500 text-white w-full cursor-pointer hover:bg-blue-500 mt-4">Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default Support;
