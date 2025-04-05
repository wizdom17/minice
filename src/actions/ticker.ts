"use server";

import axios from "axios";

export const ticker = async () => {
  try {
    const res = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Clitecoin%2Cripple%2Ccardano%2Cdogecoin%2Csolana%2Cpolkadot%2Cchainlink%2Cuniswap`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-QdpdAqadCCiVNgWdWtUcuABf",
        },
      }
    );
    return { data: res.data };
  } catch (error) {
    return { error: error };
  }
};
