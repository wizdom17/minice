"use client";
import React, { useRef, useState, useEffect } from "react";
import { GiftCard } from "@/actions/giftcards";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Upload, Check, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Schema
const formSchema = z.object({
  cardForm: z.string().optional(),
  country: z.string().min(1, "Select a country"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Amount must be a number",
    }),
  comment: z.string().optional(), // Optional comment field
});

type FormData = z.infer<typeof formSchema>;

const Giftcards = ({ giftcards }: { giftcards: GiftCard[] }) => {
  const [selectedGiftcard, setSelectedGiftcard] = useState<GiftCard | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [rate, setRate] = useState<number>(0); // State for rate
  const {
    reset,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardForm: "",
      country: "",
      amount: "",
      comment: "",
    },
    mode: "onChange",
  });

  const isFormValid = isValid && files.length > 0;

  const onSubmit = (data: FormData) => {
    console.log("Form submitted with:", data, files);
  };

  const handleCardClick = (card: GiftCard) => {
    setSelectedGiftcard(card);
    setOpenModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileRemove = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Update the rate when the country changes
  useEffect(() => {
    if (selectedGiftcard && selectedCountry) {
      const country = selectedGiftcard.countries.find(
        (c) => c.name === selectedCountry
      );
      if (country) {
        setRate(country.rate);
      }
    }
  }, [selectedGiftcard, selectedCountry]);

  useEffect(() => {
    if (!openModal) {
      setSelectedGiftcard(null); // Reset selected gift card when modal is closed
      setSelectedCountry(null); // Reset selected country
      setRate(0); // Reset rate
      reset(); // Reset form when modal is closed
      setFiles([]); // Reset the files state
    }
  }, [openModal, reset]);

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 mt-14">
      {giftcards.map((card, i) => (
        <div
          key={i}
          onClick={() => handleCardClick(card)}
          className="flex cursor-pointer items-center justify-center flex-col gap-y-2"
        >
          <img src={card.img} alt={card.name} className="w-full h-auto" />
          <p className="text-center text-sm font-semibold">{card.name}</p>
        </div>
      ))}

      <Sheet open={openModal} onOpenChange={setOpenModal}>
        <SheetContent
          side="right"
          className="w-[300px] lg:w-[400px] overflow-y-auto"
        >
          <SheetHeader className="bg-primary-bg p-7">
            <SheetTitle className="text-2xl font-sans font-semibold">
              {selectedGiftcard?.name}
            </SheetTitle>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 mt-5 space-y-6 font-sans"
          >
            <div>
              <Label className="block text-slate-500 mb-2">
                Gift Card Form (Optional)
              </Label>
              <Select onValueChange={(val) => setValue("cardForm", val)}>
                <SelectTrigger className="w-full h-14 border-slate-200">
                  <SelectValue placeholder="Select Card Form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physical">Physical Card</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="block text-slate-500 mb-2">
                Gift Card Country
              </Label>
              <Select
                onValueChange={(val) => {
                  setSelectedCountry(val);
                  setValue("country", val);
                }}
                defaultValue="euro"
              >
                <SelectTrigger className="w-full h-14 border-slate-200">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  {selectedGiftcard?.countries.map((card, index) => (
                    <SelectItem key={index} value={card.name}>
                      {card.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message}
                </p>
              )}
            </div>

            <div>
              <Label className="block text-slate-500 mb-2">
                Total Gift Card Amount
              </Label>
              <Input
                {...register("amount")}
                type="text"
                className="w-full h-14 border-slate-200"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div>
              <Label className="block text-slate-500 mb-2">
                Comment (Optional)
              </Label>
              <textarea
                {...register("comment")}
                className="w-full h-24 border rounded-md border-slate-200 resize-none p-2"
                placeholder="Add any additional comments"
              />
            </div>
            <div className="p-3 rounded-md bg-primary-bg text-sm text-slate-500">
              <div className="flex items-center justify-between border-b boder-slate-200 py-1">
                <p>Rate</p>
                <p>₦{rate}</p>
              </div>
              <div className="flex items-center justify-between py-1">
                <p>Total</p>
                <p>₦{rate * Number(watch("amount"))}</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              multiple
              accept=".png"
              className="hidden"
              onChange={handleFileChange}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border cursor-pointer border-dashed rounded-lg p-8 flex flex-col items-center justify-center border-gray-300"
            >
              <div className="bg-gray-100 p-3 rounded-lg mb-3">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
              <div className="text-center">
                <p className="text-blue-500 font-medium">Upload</p>
                <p className="text-gray-400">file or click to select</p>
                <p className="text-gray-400 text-sm mt-2">
                  You can upload multiple files (png) up to 10MB
                </p>
              </div>
            </div>
            {files.length > 0 && (
              <div className="mt-4 w-full">
                <p className="text-sm font-medium mb-2">Uploaded files:</p>
                <div className="space-y-2 flex flex-wrap gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-16 h-16 object-cover border rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleFileRemove(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500 h-12"
                disabled={!isFormValid}
              >
                Submit
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Giftcards;
