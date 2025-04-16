import { db } from "@/firebase";
import { decrypt } from "@/lib/session";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { cookies } from "next/headers";

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
      where("userId", "==", decoded.userId as string),
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

export type Trade = {
  amount?: string;
  cardForm?: string;
  comment?: string;
  country?: string;
  createdAt: number;
  id: string;
  images: string[];
  name: string;
  rate: string;
  status: string;
  type: string;
  updatedAt: number;
  userEmail: string;
  userId: string;
  chain?: string;
  address?: string;
  value?: string;
  currency?: string;
};
