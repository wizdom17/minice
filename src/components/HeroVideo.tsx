import HeroVideoDialog from "./magicui/hero-video-dialog";

export function HeroVideo() {
  return (
    <div className="relative md:w-[80%] w-full mx-auto mt-12">
      <HeroVideoDialog
        className="block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
