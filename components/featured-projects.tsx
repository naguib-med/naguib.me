"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { ProjectCard } from "@/components/project-card";

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

  const y = useParallax(scrollYProgress, 30);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative overflow-hidden py-24"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background/50" />

      <motion.div style={{ y }} className="container relative space-y-12">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm text-primary/80"
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
            className="mt-4 text-muted-foreground/80"
          >
            Découvrez une sélection de mes derniers projets, mettant en valeur
            mes compétences en développement web.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <div className="text-center">
          <MagneticButton>
            <Button
              variant="outline"
              size="lg"
              className="group relative h-12 overflow-hidden rounded-full border-primary/10 px-8 hover:border-primary/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Voir Tous les Projets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-primary/5"
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
