import { fetchUser } from "@/actions/user";
import PersonalInformationForm from "@/components/dashboard/ProfileUpdate";
import React from "react";

const Page = async () => {
  const { user } = await fetchUser();
  return (
    <div>
      <p className="text-2xl text-colorSecondary font-sans font-semibold">
        Profile
      </p>
      {user && <PersonalInformationForm user={user} />}
    </div>
  );
};

export default Page;
