"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Code, Rocket, Star, TrendingUp, Filter, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/magnetic-button";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/constants";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, (latest) => {
    return latest * (distance * 2) - distance;
  });
}

export function FeaturedProjects() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useParallax(scrollYProgress, 30);
  const opacity = useTransform(scrollYProgress, (latest) => {
    if (latest <= 0) return 0;
    if (latest < 0.2) return latest / 0.2;
    if (latest < 0.8) return 1;
    return 1 - (latest - 0.8) / 0.2;
  });

  // État pour le filtrage optionnel des projets
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Sélection des projets récents avec filtrage optionnel
  const recentProjects = projects
    .filter(project => project.isRecent)
    .slice(0, 3);

  // Extraction des catégories uniques pour un futur filtre
  const uniqueCategories = Array.from(
    new Set(projects.flatMap(project => project.tags.map(tag =>
      typeof tag === 'string' ? tag : tag.name
    )))
  ).slice(0, 5); // Limiter à 5 catégories principales

  return (
    <motion.section
      ref={ref}
      style={{ opacity }}
      className="relative overflow-hidden py-24 my-12"
    >
      {/* Arrière-plan amélioré */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-30" />
        <div className="absolute top-0 right-0 h-[500px] w-[800px] rounded-full bg-primary/5 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full bg-blue-500/5 blur-[100px] -z-10" />
      </div>

      <motion.div
        style={{ y }}
        className="container relative space-y-12 px-6"
      >
        {/* En-tête de section */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
          >
            <Rocket className="h-4 w-4" />
            Projets et Réalisations
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Projets Récents
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground/90 max-w-xl mx-auto"
          >
            Découvrez une sélection de mes derniers projets, mettant en valeur
            mes compétences en développement web et mon approche de la sécurité.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center flex-wrap gap-3 max-w-3xl mx-auto"
        >
          {/* Pour une future implémentation, actuellement caché */}
          <div className="hidden items-center gap-2 rounded-full border border-border/50 bg-card/30 backdrop-blur-sm px-4 py-1.5 text-sm text-muted-foreground">
            <Filter className="h-3.5 w-3.5" />
            <span>Filtrer par:</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {recentProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              variant="grid"
            />
          ))}
        </motion.div>

        {/* Badge de projet vedette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-2xl bg-gradient-to-r from-primary/5 via-card/50 to-blue-500/5 border border-border/40 p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Star className="h-6 w-6" />
              </div>
              <div className="flex-grow space-y-1">
                <h3 className="text-lg font-semibold">Projet phare : Application CRA & Fiches de paie</h3>
                <p className="text-sm text-muted-foreground">
                  Application fullstack développée en entreprise pendant mon alternance, autonomisant la gestion des comptes-rendus d&apos;activité et l'envoi automatisé des fiches de paie.
                </p>
              </div>
              <MagneticButton>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0 rounded-full border-primary/20 hover:border-primary/30 bg-card/50 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-1">
                    <Folder className="h-4 w-4" />
                    Détails
                  </span>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center pt-8"
        >
          <MagneticButton>
            <Button
              variant="outline"
              size="lg"
              className="group relative h-14 overflow-hidden rounded-full border-primary/20 px-8 hover:border-primary/40 shadow-sm hover:shadow"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Voir Tous les Projets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-primary/10 via-primary/5 to-blue-500/10"
                initial={false}
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.4 }}
              />
            </Button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}