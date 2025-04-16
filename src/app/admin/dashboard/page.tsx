import React from "react";
import { BsArrowDownCircle, BsArrowUpCircle } from "react-icons/bs";
import {
  FaArrowRightArrowLeft,
  FaClock,
  FaUserCheck,
  FaUsers,
  FaUsersSlash,
} from "react-icons/fa6";
import { fetchAdmin, fetchTrades, fetchTransactions, fetchUsers } from "@/actions/admin";
import { RecentRegisterations } from "@/components/admin/RecentRegistrations";
import TradesTable from "@/components/admin/RecentTrades";
import TransactionTable from "@/components/admin/RecentTranscations";

export default async function Page() {
  const { user } = await fetchAdmin();
  const { transactions } = await fetchTransactions();
  const { users } = await fetchUsers();
  const { trades } = await fetchTrades();

  const totalWithdrawals = transactions?.reduce(
    (acc, trx) => (trx.type === "withdrawal" ? acc + trx.amount : acc),
    0
  );

  const totalDeposits = transactions?.reduce(
    (acc, trx) => (trx.type === "deposit" ? acc + trx.amount : acc),
    0
  );

  const pendingWithdrawals = transactions?.reduce(
    (acc, trx) =>
      (trx.type === "withdrawal" && trx.status === "proccessing") 
        ? acc + trx.amount
        : acc,
    0
  );

  const pendingDeposits = transactions?.reduce(
    (acc, trx) =>
      trx.type === "deposit"
        ? acc + trx.amount
        : acc,
    0
  );

  const blockedUers = users?.filter((user) => user.status === "banned").length;

  const dashboardItems = [
    {
      title: "Total Users",
      icon: <FaUsers size={35} />,
      amount: users?.length,
      color: "bg-[#35449c]",
    },
    {
      title: "Active Users",
      icon: <FaUserCheck size={35} />,
      amount: users?.length,
      color: "bg-[#6862ce]",
    },
    {
      title: "Blocked Users",
      icon: <FaUsersSlash size={35} />,
      amount: blockedUers,
      color: "bg-[#F25961]",
    },
    {
      title: "Total Trades",
      icon: <FaArrowRightArrowLeft size={35} />,
      amount: trades?.length,
      color: "bg-[#ffad46]",
    },
    {
      title: "Total Deposits",
      icon: <BsArrowDownCircle size={35} />,
      amount: totalDeposits,
      color: "bg-[#ffad46]",
      showDollars: true,
    },
    {
      title: "Total Withdrawals",
      icon: <BsArrowUpCircle size={35} />,
      amount: totalWithdrawals,
      color: "bg-[#F25961]",
      showDollars: true,
    },
    {
      title: "Pending Deposits",
      icon: <FaClock size={35} />,
      amount: pendingDeposits,
      color: "bg-[#ffad46]",
      showDollars: true,
    },
    {
      title: "Pending Withdrawals",
      icon: <FaClock size={35} />,
      amount: pendingWithdrawals,
      color: "bg-[#ffad46]",
      showDollars: true,
    },
  ];

  function formatToDollars(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
        {dashboardItems.map((item, index) => (
          <div
            key={index}
            className="flex p-4 bg-primary-bg gap-x-3 sm:justify-between rounded-md h-[90px] col-span-1"
          >
            <div
              className={`flex h-full w-[60px] text-white items-center justify-center p-2 ${item.color} rounded-md`}
            >
              {item.icon}
            </div>
            <div className="flex justify-center sm:items-end flex-col gap-y-1">
              <p className="text-sm text-muted-400">{item.title}</p>
              {!item.showDollars ? (
                <p className="text-xl">{item?.amount}</p>
              ) : (
                <p className="text-xl">
                  {formatToDollars(item.amount as number)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 p-4 bg-primary-bg">
        <p className="font-semibold font-sans mb-3">Recent Registrations</p>
        <RecentRegisterations data={users} />
      </div>
      
      <div className="mt-10 p-4 bg-primary-bg">
        <p className="font-semibold font-sans">Recent Trades</p>
        <TradesTable data={trades} />
      </div>
      <div className="mt-10 p-4 bg-primary-bg">
        <p className="font-semibold font-sans">Recent Transactions</p>
        <TransactionTable data={transactions} />
      </div>
    </div>
  );
}
