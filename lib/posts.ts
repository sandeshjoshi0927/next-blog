export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  authorId: string; // Reference to user who created it
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  tags: string[];
  coverImage?: string;
}

const POSTS_KEY = "blog_posts";

// Get all posts from localStorage
export const getPosts = (): BlogPost[] => {
  if (typeof window === "undefined") return [];

  const postsJson = localStorage.getItem(POSTS_KEY);
  return postsJson ? JSON.parse(postsJson) : [];
};

// Save posts to localStorage
const savePosts = (posts: BlogPost[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

// Create a new blog post
export const createPost = (
  title: string,
  content: string,
  authorId: string,
  authorName: string,
  tags: string[] = [],
  coverImage?: string,
): BlogPost => {
  const posts = getPosts();

  const newPost: BlogPost = {
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title,
    content,
    excerpt: content.substring(0, 150) + "...", // Auto-generate excerpt
    authorId,
    authorName,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
    tags,
    coverImage,
  };

  posts.unshift(newPost); // Add at beginning
  savePosts(posts);

  return newPost;
};

// Get post by ID
export const getPostById = (id: string): BlogPost | null => {
  const posts = getPosts();
  return posts.find((post) => post.id === id) || null;
};

// Get posts by author (user)
export const getPostsByAuthor = (authorId: string): BlogPost[] => {
  const posts = getPosts();
  return posts.filter((post) => post.authorId === authorId);
};

// Update a post
export const updatePost = (
  id: string,
  updates: Partial<
    Omit<BlogPost, "id" | "authorId" | "authorName" | "createdAt">
  >,
): BlogPost | null => {
  const posts = getPosts();
  const postIndex = posts.findIndex((post) => post.id === id);

  if (postIndex === -1) return null;

  const updatedPost = {
    ...posts[postIndex],
    ...updates,
    updatedAt: new Date(),
  };

  posts[postIndex] = updatedPost;
  savePosts(posts);

  return updatedPost;
};

// Delete a post
export const deletePost = (id: string): boolean => {
  const posts = getPosts();
  const filteredPosts = posts.filter((post) => post.id !== id);

  if (filteredPosts.length === posts.length) return false;

  savePosts(filteredPosts);
  return true;
};

// Get all posts (public)
export const getAllPosts = (): BlogPost[] => {
  return getPosts().filter((post) => post.published);
};

// Search posts
export const searchPosts = (query: string): BlogPost[] => {
  const posts = getAllPosts();
  const lowercaseQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  );
};

// Get posts by tag
export const getPostsByTag = (tag: string): BlogPost[] => {
  return getAllPosts().filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
};
