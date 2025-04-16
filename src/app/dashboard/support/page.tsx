import { fetchUser } from "@/actions/user";
import Support from "@/components/dashboard/Support";
import React from "react";

const Page = async () => {
  const { user } = await fetchUser();
  return (
    <div>
      <p className="text-2xl text-colorSecondary font-sans font-semibold">
        Help & Support
      </p>
      {user && <Support user={user} />}
    </div>
  );
};

export default Page;
