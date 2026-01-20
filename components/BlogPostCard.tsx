import Image from "next/image";

const BlogPostCard = () => {
  return (
    <div className="drop-shadow-xl py-2 px-3 bg-white/90 border ">
      <Image
        src="https://picsum.photos/120"
        width={316}
        height={206}
        alt="thumbnail"
        className="object-cover aspect-video w-full bg-red-300 mb-2"
      />

      <div className="flex flex-col gap-2">
        <span className="text-primary text-xs font-semibold ">Design</span>

        <div>
          <h1 className="font-bold leading-6.5">HR Learning Material</h1>
          <p className="text-xs leading-4.5 line-clamp-2">
            How do you create compelling presentations that wow your colleagues
            and impress your managers?
          </p>
        </div>

        <div className="text-xs font-normal opacity-60 flex items-center gap-2">
          <div className="h-2 w-2 bg-black rounded-full" />
          <p>Alex Garry</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
