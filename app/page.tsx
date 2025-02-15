"use client";

import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { MyExpertise } from "@/components/my-expertise";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <MyExpertise />
    </>
  );
}