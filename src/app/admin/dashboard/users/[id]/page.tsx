import { fetchUser } from "@/actions/admin";
import UserProfile from "@/components/admin/UserProfile";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { user } = await fetchUser(id);
  return <div>{user && <UserProfile user={user} />}</div>;
};

export default Page;
