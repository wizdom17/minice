import { fetchSupport } from "@/actions/supports";
import React from "react";
import moment from "moment";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { support } = await fetchSupport(id);
  return (
    <div className="">
      <div className="p-4 max-w-2xl w-full rounded-md border border-slate-300">
        <div className="">
          <p className="font-semibold font-sans">User</p>
          <p className="font-sans text-slate-500">{support?.userEmail}</p>
        </div>
        <div className="mt-5">
          <p className="font-semibold font-sans">Date</p>
          <p className="font-sans text-slate-500">{moment(support?.createdAt).format('MMMM Do YYYY, h:mm')}</p>
        </div>
        <div className="mt-5">
          <p className="font-semibold font-sans">Subject</p>
          <p className="font-sans text-slate-500">{support?.subject}</p>
        </div>
        <div className="mt-5">
          <p className="font-semibold font-sans">Message</p>
          <p className="font-sans text-slate-500">{support?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
