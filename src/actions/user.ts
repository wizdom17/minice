"use server";

import { db } from "@/firebase";
import { decrypt } from "@/lib/session";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { cookies } from "next/headers";

export const fetchUser = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return { error: "No token found" };
  }

  const { decoded } = await decrypt(token as string);
  try {
    const userDoc = await getDoc(doc(db, "users", decoded?.userId as string));

    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      return { user: userData };
    } else {
      return { error: "User not found" };
    }
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const fetchTransactions = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      return { error: "No token found" };
    }

    const { decoded } = await decrypt(token as string);
    if (!decoded?.userId) {
      return { error: "Invalid token" };
    }

    const transactionsQuery = query(
      collection(db, "transactions"),
      where("userId", "==", decoded.userId as string),
      orderBy("createdAt", "desc") // Ensure transactions are ordered by createdAt in descending order
    );

    const transactionsSnapshot = await getDocs(transactionsQuery);
    const trx: Trx[] = [];

    transactionsSnapshot.forEach((doc) => {
      trx.push(doc.data() as Trx);
    });

    return { transactions: trx };
  } catch (error: any) {
    console.error("Error fetching transactions:", error); // Log the full error for debugging
    return { error: error?.message || "An error occurred" };
  }
};

export type Trx = {
  id: string;
  amount: number;
  status: "completed" | "proccessing" | "success" | "declined";
  type: "withdrawal" | "deposit";
  userId: string;
  userEmail: string;
  createdAt: number;
  updatedAt: number;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
};

export type UserData = {
  balance: number;
  createdAt: number;
  email: string;
  firstname: string;
  isVerified: boolean;
  country: string;
  address: string;
  phone: string;
  id: string;
  status: "active" | "banned";
  role: "user";
  lastname: string;
  referral_code: string;
  total_deposit: number;
  total_withdrawal: number;
  bank_account: {
    account_number: string;
    account_name: string;
    bank_name: string;
  }[];
};
