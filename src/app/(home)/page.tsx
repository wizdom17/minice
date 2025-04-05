import EarnPointsSection from "@/components/sections/EarnPointsSection";
import FAQ from "@/components/sections/FAQ";
import HeroSection from "@/components/sections/HeroSection";
import HowToSection from "@/components/sections/HowToSection";
import NewsLetter from "@/components/sections/NewsLetter";
import TrendingGiftCard from "@/components/sections/TrendingGiftCard";
import WhyChooseSection from "@/components/sections/WhyChooseSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <WhyChooseSection />
      <EarnPointsSection />
      <HowToSection />
      <TrendingGiftCard />
      <FAQ/>
      <NewsLetter />
    </div>
  );
}
