"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink, Github, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";

const projects = [
  {
    title: "Portfolio Alimenté par IA",
    description: "Portfolio Next.js avec génération de contenu pilotée par IA",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Plateforme de Blog Créative",
    description: "Blog moderne avec contenu dynamique et animations",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["React", "MDX", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    title: "CV Interactif",
    description: "Expérience de CV alimentée par WebGL",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Three.js", "GSAP", "TypeScript"],
    demoUrl: "#",
    githubUrl: "#",
  },
];

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export function FeaturedProjects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useParallax(scrollYProgress, 50);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background/30" />

      <motion.div style={{ y }} className="container relative space-y-12">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
          >
            <Code className="h-4 w-4" />
            Portfolio
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Projets Récents
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Découvrez une sélection de mes derniers projets, mettant en valeur
            mes compétences en développement web.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group perspective-1000"
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: -5,
                  transition: { duration: 0.3 },
                }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/10 to-background/5 border border-transparent transition-all duration-300 hover:border-primary/30 shadow-xl hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
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
                  <div className="flex gap-4 pt-4 border-t border-border/20">
                    <Link
                      href={project.demoUrl}
                      className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                      Demo
                    </Link>
                    <Link
                      href={project.githubUrl}
                      className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                      Code
                    </Link>
                  </div>
                </div>
              </motion.div>
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
                Voir Tous les Projets
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
    </motion.section>
  );
}
