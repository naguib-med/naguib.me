"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";

const projects = [
  {
    title: "AI-Powered Portfolio",
    description: "Next.js portfolio with AI-driven content generation",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Creative Blog Platform",
    description: "Modern blog with dynamic content and animations",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "MDX", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Interactive Resume",
    description: "WebGL-powered interactive resume experience",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Three.js", "GSAP", "TypeScript"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

export function FeaturedProjects() {
  const [workRef, workInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={workRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={workInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container relative space-y-12"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={workInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
          >
            <Star className="h-4 w-4" />
            Featured Projects
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={workInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Latest Work
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={workInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            A selection of my recent projects and creative endeavors
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ y: 20, opacity: 0 }}
              animate={workInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-background/95 to-background/90 p-[1px] shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-background">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="space-y-4 p-6">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Link
                      href={project.demoUrl}
                      className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                      Live Preview
                    </Link>
                    <Link
                      href={project.githubUrl}
                      className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                      Source Code
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <MagneticButton>
            <Button
              variant="outline"
              size="lg"
              className="group relative h-12 overflow-hidden rounded-full border-primary/20 px-8"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-primary/10"
                initial={false}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}