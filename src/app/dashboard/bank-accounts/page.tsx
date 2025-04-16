import { fetchBanks } from "@/actions/banks";
import { fetchUser } from "@/actions/user";
import BankAccounts from "@/components/dashboard/BankAccounts";
import React from "react";

const Page = async () => {
  const { user } = await fetchUser();
  const { banks } = await fetchBanks();
  return (
    <div>
      <p className="text-lg font-sans font-semibold">Manage Bank Account</p>
      {user && banks && <BankAccounts banks={banks} user={user} />}
    </div>
  );
};

export default Page;
