import Image from "next/image";
import React from "react";

const TrendingGiftCard = () => {
  const giftCards = [
    {
      id: 1,
      name: "Amazon",
      imageUrl: "/images/gift-cards/amazon.webp",
    },
    {
      id: 2,
      name: "Google Play",
      imageUrl: "/images/gift-cards/googleplay.webp",
    },
    {
      id: 3,
      name: "Apple",
      imageUrl: "/images/gift-cards/apple.webp",
    },
    {
      id: 4,
      name: "Ebay",
      imageUrl: "/images/gift-cards/ebay.webp",
    },
    {
      id: 5,
      name: "Steam",
      imageUrl: "/images/gift-cards/steam.webp",
    },
    {
      id: 6,
      name: "Nordstrom",
      imageUrl: "/images/gift-cards/nordstrom.webp",
    },
    {
      id: 7,
      name: "Razer Gold",
      imageUrl: "/images/gift-cards/razergold.webp",
    },
    {
      id: 8,
      name: "Vanila",
      imageUrl: "/images/gift-cards/vanilla.webp",
    },
    {
      id: 9,
      name: "Sephora",
      imageUrl: "/images/gift-cards/sephora.webp",
    },
    {
      id: 10,
      name: "Amex",
      imageUrl: "/images/gift-cards/amex.webp",
    },
  ];
  return (
    <section className="p-20 lg:px-20 md:px-10 px-5 bg-primary-bg">
      <div className="">
        <h1 className="text-lg font-bold font-sans text-blue-600">
          What's Trending
        </h1>
        <h1 className="lg:text-4xl text-2xl mt-6 font-bold font-sans text-colorSecondary">
          Popular Gift Cards
        </h1>
        <p className="text-xl mt-4 font-medium text-slate-600 font-sans max-w-2xl">
          Prestmit has a catalogue of over 1,000 gift cards. But below are some
          of the popular ones.
        </p>
      </div>
      <div className="grid grid-cols-5 mt-20 gap-10">
        {giftCards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center justify-center"
          >
            <Image
              src={card.imageUrl}
              alt={card.name}
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingGiftCard;
