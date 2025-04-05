"use server";

import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const fetchCrypto = async () => {
  try {
    const crypto: Crypto[] = [];
    const querySnapshot = await getDocs(query(collection(db, "crypto")));
    querySnapshot.forEach((doc) => {
        crypto.push(doc.data() as Crypto);
    });
    return { crypto };
  } catch (error: any) {
    return { error: error?.message };
  }
};

export type Crypto = {
  img: string;
  name: string;
  symbol: string;
  rate: string;
};
