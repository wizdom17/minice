import React from "react";
import { HeroVideo } from "../HeroVideo";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";

const HowToSection = () => {
  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Register a Prestmit account in less than a minute.",
    },
    {
      number: "02",
      title: "Select Gift Card Type",
      description: "Select the type of gift card you want to exchange.",
    },
    {
      number: "03",
      title: "Choose Naira",
      description: "Select Naira as your preferred payment method.",
    },
    {
      number: "04",
      title: "Get Paid",
      description: "Wait for confirmation and get your payment.",
    },
  ];

  return (
    <section className="py-24 lg:px-20 md:px-10 px-5 bg-white">
      <div className="section-container">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 font-sans">
          How to Sell Gift Cards for Nigerian Naira
        </h2>
        <p className="text-center text-gray-600 text-lg font-medium font-sans mt-5 mb-12 max-w-3xl mx-auto">
          To sell gift cards on Prestmit: Create an account and select the sell
          gift card option on the dashboard. We accept up to 50 different gift
          card types, and you can be paid in Naira and other currencies.
        </p>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-gray-50 p-6 rounded-lg relative"
            >
              <div className="absolute top-4 right-4 text-4xl font-bold text-blue-200">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2 mt-6 font-rubik">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <HeroVideo />
        <div className="mt-8 flex items-center justify-center">
          <Link
            href={"/auth/register"}
            className="bg-blue-600 w-[250px] rounded-md hover:bg-blue-700 text-white py-4 flex font-bold px-4 items-center justify-center gap-2 transition duration-200 ease-in-out"
          >
            <p>Register Now</p>
            <MoveRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
