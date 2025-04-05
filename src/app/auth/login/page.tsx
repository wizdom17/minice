"use client";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { LoginForm } from "@/components/AuthForm";
import { signInWithGoogle } from "@/lib/googleAuth";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex items-center h-screen w-full text-light">
      <div className="lg:w-[700px] w-full mx-auto p-10 sm:px-3 h-full">
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
            <Button
              onClick={signInWithGoogle}
              className="w-full border cursor-pointer border-muted-300 text-colorSecondary h-10 flex hover:bg-muted bg-white items-center justify-center gap-x-2"
            >
              <FcGoogle size={15} />
              <p className="text-xs">Sign in with Google</p>
            </Button>
            <div className="flex items-center justify-center gap-x-3 w-full h-10">
              <div className="border-t flex-1 border-muted-300" />
              <p className="text-[10px]">or sign in with email</p>
              <div className="border-t flex-1 border-muted-300" />
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
