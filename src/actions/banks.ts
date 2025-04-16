export const fetchBanks = async () => {
  try {
    const response = await fetch(
      `https://api.paystack.co/bank?country=nigeria`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer sk_test_75c0137ff31e262cc51d0c5092fd06c81da7e462`, // Replace with your actual Bearer token
        },
      }
    );
    const data = await response.json();
    const banks = data.data as Bank[];

    // Sort banks by name alphabetically
    const sortedBanks = banks.sort((a, b) => a.name.localeCompare(b.name));

    return { banks: sortedBanks };
  } catch (error) {
    console.error("Error fetching banks:", error);
    return { error };
  }
};

export type Bank = {
  id: number;
  name: string;
  code: string;
  slug: string;
  created_at: string;
  updated_at: string;
  longcode: string;
  gateway: string;
  pay_with_bank: number;
  active: number;
  country: string;
  currency: string;
  type: string;
  is_deleted: number;
};
