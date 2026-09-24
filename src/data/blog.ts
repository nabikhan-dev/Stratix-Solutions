export type BlogCategory = string;
export type BlogFilter = string;

export type BlogSection = {
  heading?: string;
  body: string;
  images?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  image: string;
  gallery?: string[];
  featured?: boolean;
  author: { name: string; role: string };
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [];
