import { fetchUsers } from "@/actions/admin";
import { UsersTable } from "@/components/admin/UsersDataTable";
import React from "react";

const Page = async () => {
  const { users } = await fetchUsers();

  return (
    <div>
      <UsersTable data={users} />
    </div>
  );
};

export default Page;
