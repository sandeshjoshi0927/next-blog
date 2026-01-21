"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BlogPost } from "@/lib/posts";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().optional(),
  coverImage: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  published: z.boolean().default(true),
});

type PostFormData = z.infer<typeof postSchema>;

interface BlogPostFormProps {
  initialData?: BlogPost;
  onSubmit: (data: PostFormData) => Promise<void>;
  isSubmitting: boolean;
}

const BlogPostForm = ({
  initialData,
  onSubmit,
  isSubmitting,
}: BlogPostFormProps) => {
  const router = useRouter();
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      published: initialData?.published ?? true,
    },
  });

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const processForm = async (data: PostFormData) => {
    await onSubmit({
      ...data,
      tags: tags.join(","),
    });
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cover Image URL (optional)
        </label>
        <input
          {...register("coverImage")}
          type="url"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="https://example.com/image.jpg"
        />
        {errors.coverImage && (
          <p className="mt-1 text-sm text-red-600">
            {errors.coverImage.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Add a tag and press Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 hover:text-primary/70"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          {...register("content")}
          rows={15}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 font-mono text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Write your blog post here... (Markdown supported)"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          {...register("published")}
          type="checkbox"
          id="published"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="published" className="ml-2 text-sm text-gray-700">
          Publish immediately
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Post"
              : "Create Post"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BlogPostForm;
