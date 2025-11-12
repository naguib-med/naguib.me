"use client";

import { FeaturedProjects } from "@/components/featured-projects";
import LatestBlog from "@/components/latest-blog";
import { CallToAction } from "@/components/call-to-action";
import { CyberHero } from "@/components/cyber-hero";
import { DualExpertiseBanner } from "@/components/dual-expertise-banner";
import { CyberExperience } from "@/components/cyber-experience";
import { CyberEducation } from "@/components/cyber-education";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative">
        <CyberHero />
      </section>

      {/* Main Content */}
      <div className="relative">
        {/* Expertise Section */}
        <section className="relative z-10">
          <DualExpertiseBanner />
        </section>

        {/* Experience Section */}
        <section className="relative z-10">
          <CyberExperience />
        </section>

        {/* Education Section */}
        <section className="relative z-10">
          <CyberEducation />
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