"use client";
import React, { useRef, useState, useEffect } from "react";
import { GiftCard } from "@/actions/giftcards";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { LoaderCircle, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import axios from "axios";

// Zod Schema
const formSchema = z.object({
  countries: z
    .array(
      z.object({
        name: z.string(),
        currency: z.string(),
        rate: z
          .number({
            invalid_type_error: "Rate must be a number",
            required_error: "Rate is required",
          })
          .min(0.01, "Rate must be greater than zero"),
      })
    )
    .min(1, "At least one country is required"),
});

type FormData = z.infer<typeof formSchema>;

const Giftcards = ({ giftcards }: { giftcards: GiftCard[] }) => {
  const [selectedGiftcard, setSelectedGiftcard] = useState<GiftCard | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countries: [],
    },
    mode: "onChange",
  });

  const { fields, replace } = useFieldArray({
    control,
    name: "countries",
  });

  useEffect(() => {
    if (selectedGiftcard) {
      const initialData = selectedGiftcard.countries.map((c) => ({
        name: c.name,
        currency: c.currency,
        rate: c.rate, // keep it a number now
      }));
      replace(initialData);
    }
  }, [selectedGiftcard]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Handle form submission logic here
      const res = await axios.post("/api/update-giftcard", {
        name: selectedGiftcard?.name,
        data,
      });
      if (res.status === 200) {
        setOpenModal(false);
        toast.success("Rate updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to update rate.");
    } finally {
      setIsSubmitting(false);
      reset();
    }
  };

  const handleCardClick = (card: GiftCard) => {
    setSelectedGiftcard(card);
    setOpenModal(true);
  };

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-10 mt-14">
      <div className="border-dashed h-[200px] font-sans text-blue-500 cursor-pointer border border-blue-400 p-4 rounded-md flex flex-col items-center justify-center gap-y-3">
        <FaCirclePlus size={20} />
        <p className="text-sm">Add Gift Card</p>
      </div>
      {giftcards.map((card, i) => (
        <div
          key={i}
          onClick={() => handleCardClick(card)}
          className="flex cursor-pointer items-center justify-center flex-col gap-y-2"
        >
          <img src={card.img} alt={card.name} className="w-full rounded-2xl h-[150px]" />
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
            className="p-4 space-y-6 font-sans"
          >
            <div className="">
              {fields.map((field, index) => (
                <div key={index} className="flex flex-col mt-5">
                  <label className="text-sm text-slate-500">
                    {field.currency !== "null"
                      ? `${field.currency} - ${field.name}`
                      : `Other - ${field.name}`}
                  </label>
                  <input
                    type="number"
                    step="any"
                    className="h-12 text-sm bg-primary-bg px-3 focus:outline-blue-500 rounded-md"
                    {...register(`countries.${index}.rate` as const, {
                      valueAsNumber: true,
                    })}
                  />
                  {errors.countries?.[index]?.rate && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.countries[index]?.rate?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8">
              {isSubmitting ? (
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500 h-12"
                  disabled
                >
                  <LoaderCircle className="animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-500 hover:bg-blue-500 h-12"
                  disabled={!isValid}
                >
                  Update
                </Button>
              )}
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Giftcards;
