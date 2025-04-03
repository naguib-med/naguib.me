"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import {
  Briefcase,
  Calendar,
  Building,
  Award,
  MapPin,
  ChevronRight,
  Download,
} from "lucide-react";

const timeline = [
  {
    year: "Sep. 2023 - Sep. 2024",
    title: "Développeur Full Stack",
    company: "Bifora Data Consulting",
    location: "Bordeaux, France",
    type: "Alternance",
    description: [
      "Développement d'une application web de Comptes-Rendus d'Activité (CRA) de manière autonome.",
      "Participation à la conception de l'architecture et au développement de l'application web de formation en ligne.",
      "Gestion de projet : planification, suivi et reporting.",
      "Écriture de scripts et mise en place de processus pour la migration des bases de données MongoDB.",
    ],
    achievements: [
      "Déploiement réussi de l'application CRA utilisée par l'ensemble des collaborateurs",
      "Réduction de 40% du temps de traitement administratif grâce à l'automatisation"
    ],
    technologies: [
      { name: "React.js", type: "frontend" },
      { name: "TypeScript", type: "frontend" },
      { name: "TailwindCSS", type: "frontend" },
      { name: "Node.js", type: "backend" },
      { name: "Nest.js", type: "backend" },
      { name: "MongoDB", type: "database" },
      { name: "Git", type: "tool" },
      { name: "Méthodologie Agile", type: "methodology" },
      { name: "Docker", type: "devops" },
      { name: "Jira", type: "tool" },
    ],
    highlight: true,
  },
  {
    year: "Avr. 2023 - Sep. 2023",
    title: "Développeur Full Stack",
    company: "Bifora Data Consulting",
    location: "Bordeaux, France",
    type: "Stage",
    description: [
      "Contribution à l'amélioration continue et à la maintenance du site web de l'entreprise.",
      "Création de tests unitaires et fonctionnels pour garantir la qualité du code.",
      "Participation à la migration des programmes SAS vers SparkR sur le cloud Databricks.",
    ],
    achievements: [
      "Augmentation de la couverture de tests de 60% à 85%"
    ],
    technologies: [
      { name: "React.js", type: "frontend" },
      { name: "Node.js", type: "backend" },
      { name: "MongoDB", type: "database" },
      { name: "Git", type: "tool" },
      { name: "Méthodologie Agile", type: "methodology" },
      { name: "Databricks", type: "tool" },
      { name: "SparkR", type: "backend" },
      { name: "SAS", type: "tool" },
    ],
    highlight: false,
  },
  {
    year: "Mars 2021 - Août 2021",
    title: "Développeur Backend Java",
    company: "Saba Africa Bank",
    location: "Djibouti",
    type: "Contrat à durée indéterminée (CDI)",
    description: [
      "Implémentation d'un service de consultation de solde et d'affichage de l'historique des transactions.",
      "Développement d'une fonctionnalité de demande de chèques en ligne.",
    ],
    achievements: [
      "Réduction du temps de traitement des demandes de chéquier de 48h à moins de 2h"
    ],
    technologies: [
      { name: "Java", type: "backend" },
      { name: "Spring Boot", type: "backend" },
      { name: "Spring Security", type: "backend" },
      { name: "Git", type: "tool" },
      { name: "Méthodologie Agile", type: "methodology" },
    ],
    highlight: false,
  },
  {
    year: "Oct. 2020 - Jan. 2021",
    title: "Développeur Web",
    company: "Infoexpert",
    location: "Djibouti",
    type: "Contrat à durée déterminée (CDD)",
    description: [
      "Développement d'une application web de gestion de bibliothèque.",
      "Mise en place d'un système de suivi des prêts et retours avec notifications automatiques pour les utilisateurs.",
      "Implémentation de fonctionnalités de recherche et de filtrage pour faciliter la navigation des utilisateurs.",
    ],
    technologies: [
      { name: "React.js", type: "frontend" },
      { name: "Spring Boot", type: "backend" },
      { name: "MySQL", type: "database" },
      { name: "Git", type: "tool" },
      { name: "Méthodologie Agile", type: "methodology" },
    ],
    highlight: false,
  },
  {
    year: "Juin 2020 - Sep. 2020",
    title: "Développeur Frontend Vue.js",
    company: "Hôpital Peltier",
    location: "Djibouti",
    type: "Stage",
    description: [
      "Participation au développement d'une application web de gestion des patients pour optimiser les processus des infirmiers majors.",
      "Collaboration à la conception des interfaces utilisateurs et à la gestion des données des patients.",
      "Contribution à la mise en place de fonctionnalités clés et à l'optimisation de l'expérience utilisateur.",
    ],
    technologies: [
      { name: "Vue.js", type: "frontend" },
      { name: "Node.js", type: "backend" },
      { name: "SCSS", type: "frontend" },
      { name: "Vuetify", type: "frontend" },
      { name: "MySQL", type: "database" },
      { name: "Git", type: "tool" },
      { name: "Méthodologie Agile", type: "methodology" },
    ],
    highlight: false,
  },
];

type TechType = "frontend" | "backend" | "database" | "devops" | "tool" | "methodology";

const techColors: Record<TechType, { bg: string; text: string; ring: string }> = {
  frontend: { bg: "bg-blue-500/10", text: "text-blue-500", ring: "ring-blue-500/20" },
  backend: { bg: "bg-green-500/10", text: "text-green-500", ring: "ring-green-500/20" },
  database: { bg: "bg-amber-500/10", text: "text-amber-500", ring: "ring-amber-500/20" },
  devops: { bg: "bg-red-500/10", text: "text-red-500", ring: "ring-red-500/20" },
  tool: { bg: "bg-purple-500/10", text: "text-purple-500", ring: "ring-purple-500/20" },
  methodology: { bg: "bg-indigo-500/10", text: "text-indigo-500", ring: "ring-indigo-500/20" }
};


export function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, (latest) => `${latest * 15}%`);

  const [timelineRef, timelineInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-24 sm:py-32 my-12"
    >
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-30" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[100px] -z-10" />
      </div>

      <motion.div
        ref={timelineRef}
        initial={{ opacity: 0 }}
        animate={timelineInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container relative mx-auto px-6"
      >
        {/* En-tête de section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={timelineInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
          >
            <Briefcase className="h-4 w-4" />
            Expérience Professionnelle
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={timelineInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Parcours Professionnel
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={timelineInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground/90 max-w-xl mx-auto"
          >
            Mon parcours professionnel diversifié m&apos;a permis de développer une expertise solide
            en développement full-stack et en gestion de projets informatiques dans divers secteurs.
          </motion.p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative pl-8 pb-12 last:pb-0"
            >
              {/* Point et ligne de la timeline */}
              <div className="absolute left-0 top-8 flex h-6 w-6 items-center justify-center z-10">
                <div className={`h-3 w-3 rounded-full ${item.highlight ? 'bg-violet-500' : 'bg-primary'}`} />
                <div className={`absolute h-5 w-5 animate-ping rounded-full ${item.highlight ? 'bg-violet-500/20' : 'bg-primary/20'}`} />
              </div>
              <div className="absolute left-[11px] top-14 h-[calc(100%-56px)] w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent last:hidden" />

              {/* Carte d'expérience */}
              <motion.div
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.3 },
                }}
                className={`
                  relative overflow-hidden rounded-2xl 
                  bg-card/50 backdrop-blur-sm 
                  border border-border/50 
                  hover:border-primary/20 
                  transition-all duration-300 
                  hover:shadow-lg hover:shadow-primary/5 
                  p-6
                  ${item.highlight ? 'bg-gradient-to-br from-primary/5 to-transparent border-primary/10' : ''}
                `}
              >
                {/* Barre supérieure pour expérience mise en avant */}
                {item.highlight && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-blue-500"></div>
                )}

                <div className="space-y-5">
                  {/* En-tête d'expérience */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Building className="h-4 w-4 text-primary/70" />
                          {item.company}
                        </span>
                        <span className="hidden md:inline">•</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-primary/70" />
                          {item.location || "Non spécifié"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                        <Calendar className="h-3.5 w-3.5" />
                        {item.year}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Description du poste */}
                  <div className="space-y-3 border-t border-border/30 pt-4">
                    <h4 className="text-sm font-medium text-foreground/90">Responsabilités</h4>
                    <ul className="text-sm text-muted-foreground space-y-1.5">
                      {item.description.map((desc, descIndex) => (
                        <li key={descIndex} className="flex gap-2">
                          <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary/50" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Réalisations (si disponibles) */}
                  {item.achievements && item.achievements.length > 0 && (
                    <div className="space-y-3 border-t border-border/30 pt-4">
                      <h4 className="text-sm font-medium text-foreground/90">Réalisations clés</h4>
                      <ul className="text-sm text-muted-foreground space-y-1.5">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="flex gap-2">
                            <Award className="h-4 w-4 mt-0.5 flex-shrink-0 text-amber-500/70" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies utilisées */}
                  <div className="space-y-3 border-t border-border/30 pt-4">
                    <h4 className="text-sm font-medium text-foreground/90">Technologies & Outils</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => {
                        const colorSet = techColors[tech.type as TechType] || { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/20" };
                        return (
                          <span
                            key={tech.name}
                            className={`inline-flex items-center rounded-full 
          ${colorSet.bg} px-2.5 py-1 
          text-xs font-medium 
          ${colorSet.text}
          ring-1 ring-inset ${colorSet.ring}
          transition-all duration-200
          hover:scale-105
        `}>
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bannière de téléchargement CV */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 mx-auto max-w-4xl"
        >
          <div className="rounded-2xl bg-gradient-to-r from-primary/5 via-card/50 to-blue-500/5 border border-border/40 p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Vous souhaitez en savoir plus ?</h3>
                <p className="text-sm text-muted-foreground">
                  Téléchargez mon CV complet au format PDF pour découvrir l&apos;ensemble de mon parcours professionnel.
                </p>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                href="/path-to-your-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" />
                Télécharger mon CV
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}