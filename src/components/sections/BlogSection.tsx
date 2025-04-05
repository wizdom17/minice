"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blog posts");
      }
      const data = await response.json();
      setBlogPosts(data.data);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };
  useEffect(() => {
    fetchBlogPosts();
  }, []);

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" } as const;
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-colorSecondary mb-4">
          From the blog
        </h2>
        <p className="md:text-xl text-lg text-gray-600 max-w-2xl mx-auto">
          Learn about cryptocurrencies, gift cards, finance and the world of
          digital payments.
        </p>
        <div className="flex gap-x-5 items-center justify-center my-6">
          <input
            type="text"
            placeholder="Enter your Email"
            className="w-[300px] p-3 border focus:outline-blue-600 border-muted rounded-md"
          />
          <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer py-6">
            Subscribe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link
            key={post.uuid}
            href="#"
            className="group relative rounded-2xl overflow-hidden h-[500px] block"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
            <Image
              src={post.image_url || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="flex items-center gap-2 mb-2">
                <time
                  dateTime={formatDate(post.published_at)}
                  className="text-sm text-gray-300"
                >
                  {formatDate(post.published_at)}
                </time>
                <div className="h-6 w-6 rounded-full overflow-hidden relative">
                  <Image
                    src={"/images/user.png"}
                    alt={"user"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="md:text-xl text-xl font-semibold font-sans text-white">{post.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
