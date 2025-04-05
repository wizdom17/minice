"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RegisterForm } from "@/components/AuthForm";
import { signUpWithGoogle } from "@/lib/googleAuth";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex h-screen dark:bg-muted-50 dark:text-muted-300 w-full text-light">
      <div className="lg:w-[700px] mx-auto w-full sm:px-3 p-10 h-full">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="w-40 h-8 relative">
              <Image
                src="/images/logo-prest.svg"
                alt="Minicex"
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <div className="flex w-full h-full">
          <div className="flex w-full m-auto flex-col">
            <h1 className="mb-5 text-lg font-semibold">Create a new account</h1>
            <Button
              onClick={signUpWithGoogle}
              className="w-full border border-muted-300 text-colorSecondary cursor-pointer bg-white hover:bg-muted h-10 flex items-center justify-center gap-x-2"
            >
              <FcGoogle size={15} />
              <p className="text-xs">Sign Up with Google</p>
            </Button>
            <div className="flex items-center justify-center gap-x-3 w-full h-10">
              <div className="border-t flex-1 border-muted-300" />
              <p className="text-[10px]">or sign in with email</p>
              <div className="border-t flex-1 border-muted-300" />
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
