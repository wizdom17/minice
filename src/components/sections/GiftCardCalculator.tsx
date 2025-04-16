"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { GiftCard } from "@/actions/giftcards";
import { useEffect, useState } from "react";

export default function GiftCardCalculator({ data }: { data: GiftCard[] }) {
  const [selectedGiftcard, setSelectedGiftcard] = useState<GiftCard | null>(
    null
  );
  const [rate, setRate] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<
    GiftCard["countries"][0] | null
  >(null);
  const [amount, setAmount] = useState(0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selectedCountry) {
      setRate(selectedCountry.rate);
    } else {
      setRate(0);
    }
  }, [selectedCountry]);

  const hanleCheckRate = () => {
    if (selectedCountry) {
      setTotal(selectedCountry.rate * amount);
    } else {
      setTotal(0);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[80vh] lg:px-20 px-5">
      <div className="flex-1 p-4 md:p-8 lg:p-16 flex flex-col justify-center">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              New
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              Updated a few minutes ago <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-navy-900 mb-6">
            Current Rates Of Gift Cards - In Naira, Cedis, & USD
          </h1>

          <p className="text-gray-600 md:text-lg text-[16px]">
            With our automated gift card rate calculator, you can get the rate
            of any gift card in real-time. Rates are updated frequently,
            multiple times daily, as the market value is volatile.
          </p>
        </div>
      </div>

      <div className="lg:w-[550px] bg-primary-bg rounded-md mt-5 lg:mt-0 p-8 lg:p-12 flex items-center">
        <div className="w-full space-y-6 bg-white p-4 rounded-md">
          <div className="space-y-2">
            <label htmlFor="category" className="text-gray-700 font-medium">
              Gift Card Category
            </label>
            <Select
              onValueChange={(val) => {
                const gift = data.find((g) => g.name === val);
                setSelectedGiftcard(gift ?? null);
              }}
            >
              <SelectTrigger className="w-full h-14 border-gray-300">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item, i) => (
                  <SelectItem key={i} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="country" className="text-gray-700 font-medium">
              Country
            </label>
            <Select
              onValueChange={(val) => {
                const parsed = JSON.parse(val);
                setSelectedCountry(parsed);
              }}
              disabled={!selectedGiftcard}
            >
              <SelectTrigger className="w-full h-14 border-slate-200">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {selectedGiftcard?.countries.map((country, index) => (
                  <SelectItem key={index} value={JSON.stringify(country)}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="amount" className="text-gray-700 font-medium">
              Amount
            </label>
            <Input
              onChange={(e) => setAmount(Number(e.target.value))}
              id="amount"
              type="number"
              placeholder="0"
              className="h-14 border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="rate" className="text-gray-700 font-medium">
              Rate
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                readOnly
                className="px-3 rounded-md border border-gray-300"
                value={rate}
              />
              <div className="border w-full rounded-md h-10 pl-3 flex items-center border-gray-300">{total}</div>
            </div>
          </div>
          <Button
            onClick={hanleCheckRate}
            className="w-full h-14 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium"
          >
            Check Best Rates <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
