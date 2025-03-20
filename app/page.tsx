"use client";

import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { MyExpertise } from "@/components/my-expertise";
import LatestBlog from "@/components/latest-blog";
import { Experience } from "@/components/experience";
import { CallToAction } from "@/components/call-to-action";
import { Education } from "@/components/education";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      {/* Main Content */}
      <div className="relative">
        {/* Expertise Section */}
        <section className="relative z-10">
          <MyExpertise />
        </section>

        {/* Experience Section */}
        <section className="relative z-10">
          <Experience />
        </section>

        {/* Education Section */}
        <section className="relative z-10">
          <Education />
        </section>

        {/* Featured Projects Section */}
        <section className="relative z-10">
          <FeaturedProjects />
        </section>

        {/* Latest Blog Section */}
        <section className="relative z-10">
          <LatestBlog />
        </section>

        {/* Call to Action Section */}
        <section className="relative z-10">
          <CallToAction />
        </section>
      </div>
    </main>
  );
}