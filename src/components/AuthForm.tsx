"use client";
import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { z, ZodError } from "zod";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

// Zod schema definition
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

// Define the type of the form data
type FormData = z.infer<typeof schema>;

// Define the type of the error object based on the schema
type ErrorType = Partial<Record<keyof FormData, string[]>>;

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setLoading(false);
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data.errorCode === "auth/invalid-credential") {
        setError("Invalid credentials");
      } else {
        setError("something went wrong");
      }
      setLoading(false);
    }
  };
  return (
    <form action="" onSubmit={handleLogin} className="text-xs mt-5">
      {error !== "" && (
        <div className="w-full p-1 rounded-lg border border-red-500 bg-red-200">
          <p className="text-xs text-center text-red-500">{error}</p>
        </div>
      )}
      <div className="w-full relative">
        <label htmlFor="email">Email address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Ex:johndoe@gmail.com"
          className="border w-full mt-1.5 pl-9 focus:ring-2 ring-indigo-500 bg-muted-200 dark:bg-muted-50 outline-none border-muted-300 rounded-md h-10 px-3"
        />
        <div className="absolute bottom-2.5 left-2">
          <CiMail size={19} className="text-muted-300" />
        </div>
      </div>
      <div className="w-full mt-7 relative">
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Ex:johndoe@gmail.com"
          className="border w-full mt-1.5 pl-9 pr-9 focus:ring-2 ring-indigo-500 bg-muted-200 dark:bg-light outline-none border-muted-300 rounded-md h-10 px-3"
        />
        <div className="absolute bottom-2.5 left-2">
          <MdLockOutline size={19} className="text-muted-300" />
        </div>
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute cursor-pointer bottom-2.5 right-2"
        >
          {showPassword ? (
            <LuEye size={19} className="text-muted-300" />
          ) : (
            <LuEyeOff size={19} className="text-muted-300" />
          )}
        </div>
      </div>
      <div className="flex my-5 text-xs text-light items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" className="rounded-full bg-transparent" />
          <label
            htmlFor="terms"
            className="text-xs dark:text-muted-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </label>
        </div>
        <Link
          href={"#"}
          className="hover:underline text-indigo-700 hover:text-indigo-500 duration-300 transition-colors"
        >
          Forgot passowrd?
        </Link>
      </div>
      {loading ? (
        <Button
          disabled
          className="w-full h-10 flex bg-indigo-500 hover:text-indigo-600 hover:scale-[1.01] transition-all duration-200 items-center justify-center gap-x-2"
        >
          <LoaderCircle className="animate-spin" size={20} />
        </Button>
      ) : (
        <Button
          disabled={email === "" || password === ""}
          className="w-full h-10 flex bg-indigo-500 hover:bg-white cursor-pointer hover:text-indigo-600 hover:scale-[1.01] transition-all duration-200 items-center justify-center gap-x-2"
        >
          <p className="text-xs">Sign in</p>
        </Button>
      )}

      <div className="border-t my-5 flex-1 border-muted-300" />
      <div className="flex gap-x-1 text-xs">
        <p className="text-xs">Don't have an account?</p>
        <Link href={"/auth/register"} className="text-indigo-500">
          Create an account
        </Link>
      </div>
    </form>
  );
};

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(false);

  // State for errors, using the ErrorType
  const [errors, setErrors] = useState<ErrorType>({});
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Tracks if the submit button should be enabled

  // Enable button only if all fields are filled
  useEffect(() => {
    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsButtonEnabled(isFormValid);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error on input change if button is enabled
    if (isButtonEnabled) {
      try {
        // Validate just the changed field to clear any error
        schema.shape[name as keyof FormData].parse(value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
      } catch (error) {
        if (error instanceof ZodError) {
          const fieldErrors: ErrorType = error.flatten().fieldErrors;
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: (error as ZodError).errors.map((e) => e.message),
          }));
        }
      }
    }
  };

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate entire form on submit
      schema.parse(formData);
      setErrors({}); // Clear any previous errors
      setLoading(true);
      const res = await axios.post("/api/register", {
        ...formData,
      });
      if (res.status === 200) {
        router.push("/dashboard");
      }
      setLoading(false);
      // Proceed with form submission logic, e.g., API call
    } catch (error) {
      setLoading(false);
      if (error instanceof ZodError) {
        const fieldErrors: ErrorType = error.flatten().fieldErrors;
        setErrors(fieldErrors); // Set the errors in state
      }
    }
  };
  return (
    <form onSubmit={handleRegister} className="text-xs mt-5">
      <div className="flex gap-x-3">
        <div className="w-full">
          <label htmlFor="firstname">First name</label>
          <input
            onChange={handleInputChange}
            value={formData.firstName}
            type="text"
            name="firstName"
            placeholder="Ex: John"
            className={`border w-full mt-1.5 focus:ring-2 ring-indigo-500 bg-muted-200 dark:bg-muted-50 outline-none border-${
              errors.firstName ? "red-500" : "muted-300"
            } rounded-md h-10 px-3`}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName[0]}</p>
          )}
        </div>
        <div className="w-full">
          <label htmlFor="lastname">Last name</label>
          <input
            onChange={handleInputChange}
            value={formData.lastName}
            type="text"
            name="lastName"
            placeholder="Ex: Doe"
            className={`border w-full mt-1.5 focus:ring-2 ring-indigo-500 bg-muted-200 dark:bg-muted-50 outline-none border-${
              errors.lastName ? "red-500" : "muted-300"
            } rounded-md h-10 px-3`}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName[0]}</p>
          )}
        </div>
      </div>

      <div className="w-full mt-5 relative">
        <label htmlFor="email">Email address</label>
        <input
          onChange={handleInputChange}
          value={formData.email}
          type="email"
          name="email"
          placeholder="Ex: johndoe@gmail.com"
          className={`border w-full mt-1.5 pl-9 focus:ring-2 ring-indigo-500 bg-muted-200 dark:bg-muted-50 outline-none border-${
            errors.email ? "red-500" : "muted-300"
          } rounded-md h-10 px-3`}
        />
        <div className="absolute top-8 left-2">
          <CiMail size={19} className="text-muted-300" />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
        )}
      </div>

      <div className="w-full mt-5 relative">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleInputChange}
          value={formData.password}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          className={`border w-full mt-1.5 pl-9 pr-9 focus:ring-2 ring-indigo-500 bg-muted-200 dark:bg-muted-50 outline-none border-${
            errors.password ? "red-500" : "muted-300"
          } rounded-md h-10 px-3`}
        />
        <div className="absolute top-8 left-2">
          <MdLockOutline size={19} className="text-muted-300" />
        </div>
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute cursor-pointer top-8 right-2"
        >
          {showPassword ? (
            <LuEye size={19} className="text-muted-300" />
          ) : (
            <LuEyeOff size={19} className="text-muted-300" />
          )}
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
        )}
      </div>

      <div className="flex my-5 text-xs text-light items-center">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" className="rounded-full bg-transparent" />
          <label
            htmlFor="terms"
            className="text-xs font-medium dark:text-muted-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I accept the terms and conditions
          </label>
        </div>
      </div>
      {loading ? (
        <Button
          disabled
          className="w-full h-10 flex bg-indigo-500 hover:text-indigo-600 hover:scale-[1.01] transition-all duration-200 items-center justify-center gap-x-2"
        >
          <LoaderCircle className="animate-spin" size={20} />
        </Button>
      ) : (
        <Button
          disabled={!isButtonEnabled}
          className="w-full h-10 flex bg-indigo-500 hover:bg-white cursor-pointer hover:text-indigo-600 hover:scale-[1.01] transition-all duration-200 items-center justify-center gap-x-2"
        >
          <p className="text-xs">Register</p>
        </Button>
      )}
      <div className="border-t my-5 flex-1 border-muted-300" />
      <div className="flex gap-x-1 text-xs">
        <p className="text-xs">Already have an account?</p>
        <Link href={"/auth/login"} className="text-indigo-500">
          Login
        </Link>
      </div>
    </form>
  );
};

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/admin-login", {
        email,
        password,
      });
      if (res.status === 200) {
        setLoading(false);
        router.push("/admin/dashboard");
      }
    } catch (error: any) {
      if (error.response.data.errorCode === "auth/invalid-credential") {
        setError("invalid credentials");
      }else{
        setError(error.code);
      }
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-secondary-foreground border border-muted-300 text-light mx-auto mt-32">
      <div className="flex items-center justify-center mx-auto mt-7 mb-4">
        <Link className="" href={"/"}>
          <Image
            alt="app logo"
            src="/app-logo.png"
            width={150}
            height={90}
            objectFit="contain"
          />
        </Link>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Admin Login
        </CardTitle>
        {error && (
          <div className="flex items-center justify-center rounded-md bg-red-100 border border-red-400 text-red-500">
            <p className="text-sm">{error}</p>
          </div>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              className="focus:ring-2 ring-indigo-500  dark:bg-muted-50 border-muted-300 outline-none"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="focus:ring-2 ring-indigo-500  dark:bg-muted-50 border-muted-300 outline-none"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {loading ? (
            <Button
              disabled
              type="submit"
              className="w-full flex gap-x-2 hover:bg-indigo-400 bg-indigo-500"
            >
              <LoaderCircle className="animate-spin" size={20} />
              <p>Login</p>
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full hover:bg-indigo-400 bg-indigo-500"
            >
              Login
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
