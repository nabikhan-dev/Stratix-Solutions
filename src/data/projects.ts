export type Project = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  image: string;
  gallery: string[];
  results: string[];
  metric: { value: string; label: string };
  bg: string;
  span: string;
  light?: boolean;
  url?: string;
};

export const projects: Project[] = [];
