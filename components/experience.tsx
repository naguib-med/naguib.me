"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase } from "lucide-react";

const timeline = [
  {
    year: "Sep. 2023 - Sep. 2024",
    title: "Développeur Full Stack",
    company: "Bifora Data Consulting",
    type: "Alternance",
    description: [
      "Développement d'une application web de Comptes-Rendus d'Activité (CRA) de manière autonome.",
      "Participation à la conception de l'architecture et au développement de l'application web de formation en ligne.",
      "Gestion de projet : planification, suivi et reporting.",
      "Écriture de scripts et mise en place de processus pour la migration des bases de données MongoDB.",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "TailwindCSS",
      "Node.js",
      "Nest.js",
      "MongoDB",
      "Git",
      "Méthodologie Agile",
      "Docker",
      "Jira",
    ],
  },
  {
    year: "Avr. 2023 - Sep. 2023",
    title: "Développeur Full Stack",
    company: "Bifora Data Consulting",
    type: "Stage",
    description: [
      "Contribution à l'amélioration continue et à la maintenance du site web de l'entreprise.",
      "Création de tests unitaires et fonctionnels pour garantir la qualité du code.",
      "Participation à la migration des programmes SAS vers SparkR sur le cloud Databricks.",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Git",
      "Méthodologie Agile",
      "Databricks",
      "SparkR",
      "SAS",
    ],
  },
  {
    year: "Mars 2021 - Août 2021",
    title: "Développeur Backend Java",
    company: "Saba Africa Bank",
    type: "Contrat à durée indéterminée (CDI)",
    description: [
      "Implémentation d'un service de consultation de solde et d'affichage de l'historique des transactions.",
      "Développement d'une fonctionnalité de demande de chèques en ligne.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Git",
      "Méthodologie Agile",
    ],
  },
  {
    year: "Oct. 2020 - Jan. 2021",
    title: "Développeur Web",
    company: "Infoexpert",
    type: "Contrat à durée déterminée (CDD)",
    description: [
      "Développement d'une application web de gestion de bibliothèque.",
      "Mise en place d'un système de suivi des prêts et retours avec notifications automatiques pour les utilisateurs.",
      "Implémentation de fonctionnalités de recherche et de filtrage pour faciliter la navigation des utilisateurs.",
    ],
    technologies: [
      "React.js",
      "Spring Boot",
      "MySQL",
      "Git",
      "Méthodologie Agile",
    ],
  },
  {
    year: "Stage",
    title: "Développeur Frontend Vue.js",
    company: "Hôpital Peltier",
    type: "Stage",
    description: [
      "Participation au développement d'une application web de gestion des patients pour optimiser les processus des infirmiers majors.",
      "Collaboration à la conception des interfaces utilisateurs et à la gestion des données des patients.",
      "Contribution à la mise en place de fonctionnalités clés et à l'optimisation de l'expérience utilisateur.",
    ],
    technologies: [
      "Vue.js",
      "Node.js",
      "SCSS",
      "Vuetify",
      "MySQL",
      "Git",
      "Méthodologie Agile",
    ],
  },
];

export function Experience() {
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={timelineRef}
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background/50" />


      <motion.div
        initial={{ opacity: 0 }}
        animate={timelineInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="container relative"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={timelineInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
          >
            <Briefcase className="h-4 w-4" />
            Expérience Professionnelle
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={timelineInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Parcours Professionnel
          </motion.h2>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group relative pl-8 pb-12 last:pb-0"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 p-6"
              >
                <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="absolute h-4 w-4 animate-ping rounded-full bg-primary/20" />
                </div>
                <div className="absolute left-[11px] top-6 h-[calc(100%-24px)] w-px bg-gradient-to-b from-primary/50 to-transparent last:hidden" />

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {item.company} - {item.type}
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
