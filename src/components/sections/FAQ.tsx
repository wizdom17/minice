import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: 1,
    question: "What is Minicex?",
    answer:
      "Minicex is a secure platform that allows users to buy, sell, and trade gift cards easily and efficiently.",
  },
  {
    id: 2,
    question: "How do I sell my gift card on Minicex?",
    answer:
      "To sell a gift card, sign up or log in, select the gift card brand and amount, upload the card details, and receive an offer instantly.",
  },
  {
    id: 3,
    question: "How long does it take to receive payment?",
    answer:
      "Payments are processed instantly or within a few minutes after your gift card is verified.",
  },
  {
    id: 4,
    question: "What payment methods does Minicex support?",
    answer:
      "Minicex supports payments via bank transfer, cryptocurrency, and other secure payment methods.",
  },
  {
    id: 5,
    question: "Is it safe to trade on Minicex?",
    answer:
      "Yes, Minicex uses advanced security measures to protect user data and transactions, ensuring a safe trading experience.",
  },
  {
    id: 6,
    question: "What should I do if I have an issue with my trade?",
    answer:
      "If you encounter any issues, contact our customer support through live chat or email, and we will assist you promptly.",
  },
];

const FAQ = () => {
  return (
    <section className="p-20 lg:px-20 md:px-10 px-5">
      <div className="max-w-[768px] mx-auto px-[10px] lg:px-[0]">
        <div className="text-center mb-10">
          <h1 className="lg:text-4xl text-2xl font-bold font-sans text-colorSecondary">
            Frequently Asked Questions
          </h1>
          <p className="lg:text-xl text-[16px] font-medium font-sans my-4 text-gray-500">
            Our customer support team is always available to answer all your
            questions. Meanwhile, here are some frequently asked questions.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem className="py-3" key={faq.id} value={`item-${faq.id}`}>
              <AccordionTrigger className="text-lg font-semibold font-sans text-colorSecondary cursor-pointer">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-slate-600 text-[16px] font-medium font-sans">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
