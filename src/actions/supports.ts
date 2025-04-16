"use server";

import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";

export const fetchSupports = async () => {
  try {
    const supports: Support[] = [];
    const querySnapshot = await getDocs(query(collection(db, "support")));
    querySnapshot.forEach((doc) => {
      supports.push(doc.data() as Support);
    });
    return { supports };
  } catch (error: any) {
    return { supports: [], error: error?.message };
  }
};

export const fetchSupport = async (id: string) => {
  try {
    const docRef = await getDoc(doc(db, "support", id));

    if (docRef.exists()) {
      const data = docRef.data() as Support;
      return { support: data };
    } else {
      return { error: "Support not found" };
    }
  } catch (error: any) {
    return { error: error?.message };
  }
};

export type Support = {
  id: string;
  message: string;
  subject: string;
  userId: string;
  userEmail: string;
  createdAt: number;
};
