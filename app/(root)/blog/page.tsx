import BlogPostCard from "@/components/BlogPostCard";
import React from "react";

const page = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-6">
      <BlogPostCard />
      <BlogPostCard />
      <BlogPostCard />
    </div>
  );
};

export default page;
