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
import { Trx, UserData } from "./user";
import { Trade } from "./trades";

export const fetchAdmin = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return { error: "No token found" };
  }

  const { decoded } = await decrypt(token as string);
  try {
    const userDoc = await getDoc(doc(db, "users", decoded?.userId as string));

    if (userDoc.exists()) {
      const userData = userDoc.data() as Admin;
      return { user: userData };
    } else {
      return { error: "User not found" };
    }
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const fetchUser = async (id: string) => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  try {
    const userDoc = await getDoc(doc(db, "users", id));

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

export const fetchUsers = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return { users: [], error: "No token found" };
  }

  try {
    const users: UserData[] = [];
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("role", "==", "user"))
    );

    querySnapshot.forEach((doc) => {
      users.push(doc.data() as UserData);
    });

    return { users, error: null };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { users: [], error: message };
  }
};

export const fetchTransactions = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      return { transactions: [], error: "No token found" };
    }

    const { decoded } = await decrypt(token as string);
    if (!decoded?.userId) {
      return { transactions: [], error: "Invalid token" };
    }

    const transactionsQuery = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc") // Ensure transactions are ordered by createdAt in descending order
    );

    const transactionsSnapshot = await getDocs(transactionsQuery);
    const trx: Trx[] = [];

    transactionsSnapshot.forEach((doc) => {
      trx.push(doc.data() as Trx);
    });

    return { transactions: trx, error: null };
  } catch (error: any) {
    console.error("Error fetching transactions:", error); // Log the full error for debugging
    return { transactions: [], error: error?.message || "An error occurred" };
  }
};

export const fetchSupportTickets = async () => {
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

    const ticketsQuery = query(
      collection(db, "support_tickets"),
      orderBy("startDate", "desc") // Add orderBy to sort by createdAt, from newest to oldest
    );

    const ticketsSnapshot = await getDocs(ticketsQuery);

    const tickets: Support[] = [];
    ticketsSnapshot.forEach((doc) => {
      tickets.push(doc.data() as Support);
    });

    return { tickets };
  } catch (error: any) {
    console.error("Error fetching tickets:", error);
    return { error: error?.message };
  }
};

export const fetchTrades = async () => {
  try {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;
    if (!token) {
      return { trades: [], error: "No token found" };
    }

    const { decoded } = await decrypt(token as string);
    if (!decoded?.userId) {
      return { trades: [], error: "Invalid token" };
    }

    const tradesQuery = query(
      collection(db, "trades"),
      orderBy("createdAt", "desc") // Ensure transactions are ordered by createdAt in descending order
    );

    const transactionsSnapshot = await getDocs(tradesQuery);
    const trx: Trade[] = [];

    transactionsSnapshot.forEach((doc) => {
      trx.push(doc.data() as Trade);
    });

    return { trades: trx, error: null };
  } catch (error: any) {
    console.error("Error fetching trades:", error); // Log the full error for debugging
    return { trades: [], error: error?.message || "An error occurred" };
  }
};

export const fetchTrade = async (id: string) => {
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

    const tradeDoc = await getDoc(doc(db, "trades", id));

    if (tradeDoc.exists()) {
      const userData = tradeDoc.data() as Trade;
      return { trade: userData };
    } else {
      return { error: "trade not found" };
    }
  } catch (error: any) {
    console.error("Error fetching trade:", error); // Log the full error for debugging
    return { error: error?.message || "An error occurred" };
  }
};

export type InvestmentPlans = {
  id: string;
  amount: number;
  status: "active" | "inactive" | "ended";
  startDate: number;
  userId: string;
  ROI: number;
  plan: string;
  user: string;
  endDate: number;
};

export type Support = {
  id: string;
  createdAt: number;
  userId: string;
  user: string;
  message: string;
};

export type Admin = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  role: "admin";
  createdAt: string;
};
