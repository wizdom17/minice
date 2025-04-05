"use server";

import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const fetchGiftcards = async () => {
  try {
    const giftcards: GiftCard[] = [];
    const querySnapshot = await getDocs(query(collection(db, "giftcard")));
    querySnapshot.forEach((doc) => {
      giftcards.push(doc.data() as GiftCard);
    });
    return { giftcards };
  } catch (error: any) {
    return { error: error?.message };
  }
};

export type GiftCard = {
  img: string;
  name: string;
  countries: [
    {
      name: string;
      currency: string;
      rate: number;
    }
  ];
};
