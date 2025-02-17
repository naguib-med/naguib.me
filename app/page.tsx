"use client";

import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { MyExpertise } from "@/components/my-expertise";
import LatestBlog from "@/components/latest-blog";
import { Experience } from "@/components/experience";
import { CallToAction } from "@/components/call-to-action";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <MyExpertise />
      <Experience />
      <LatestBlog />
      <CallToAction />
    </>
  );
}