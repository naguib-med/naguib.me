import { StaticImageData } from "next/image";

export type Tag = string | { name: string; color?: string };

export interface Project {
  title: string;
  description: string;
  image: string | StaticImageData | null | undefined;
  tags: Tag[];
  demoUrl: string;
  githubUrl: string;
  status?: string;
  isRecent?: boolean;
}

export type EducationItem = {
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string[];
  tags?: string[];
};
