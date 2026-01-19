import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <main className="h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-[60px] leading-16 font-bold">
            NEXT <span className="text-secondary">BLOG</span>
          </h1>
          <p className="text-[16px] leading-6 font-normal ">
            -Where Ideas Turn Into Stories-
          </p>
        </div>

        <div className="space-y-2">
          <h2 className="text-[40px] leading-12 font-semibold">
            Your daily dose of thoughts, tech, and creativity
          </h2>
          <p>
            Read, write, and share meaningful blogs — all in one simple,
            powerful platform.
          </p>
        </div>

        <Button type="submit" className="btn-primary">
          Write Your First Post
        </Button>
      </div>
    </main>
  );
};

export default Home;
