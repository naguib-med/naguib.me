"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Brain,
  Shield,
  Zap,
  Server,
  Database,
  ChevronRight,
  Braces,
  BookOpen,
} from "lucide-react";

const expertiseAreas = [
  {
    icon: Code,
    title: "Développement Frontend",
    description: "Création d'interfaces modernes et réactives avec React, TypeScript et design responsive. Environ 2 ans d'expérience pratique.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Responsive Design"],
    projects: ["Dashboard Analytics", "CRA & Fiches de paie", "Applications SPA"],
    color: "text-primary",
    accentColor: "bg-primary/5",
    borderColor: "group-hover:border-primary/40",
    iconBg: "from-primary/20 to-secondary/10"
  },
  {
    icon: Server,
    title: "Développement Backend",
    description: "Développement d'API RESTful et architecture backend avec Node.js et NestJS. Expérience en alternance chez Bifora.",
    skills: ["Node.js", "NestJS", "Express", "Prisma", "RESTful APIs", "JWT"],
    projects: ["API CRA Enterprise", "Backend IZO-LEARN", "Auth Systems"],
    color: "text-secondary",
    accentColor: "bg-secondary/5",
    borderColor: "group-hover:border-secondary/40",
    iconBg: "from-secondary/20 to-primary/10"
  },
  {
    icon: Shield,
    title: "Cybersécurité & Sécurité Applicative",
    description: "Étudiant Master 2 OPSIE (Label ANSSI). En apprentissage de la sécurité des SI, OWASP Top 10 et gestion des risques.",
    skills: ["OWASP Top 10", "Sécurité Web", "EBIOS RM", "ISO 27001", "Audit SSI", "Sensibilisation"],
    projects: ["Aidant Cyber ANSSI", "DevSecBlueprint", "Sécurisation backends"],
    color: "text-accent",
    accentColor: "bg-accent/5",
    borderColor: "group-hover:border-accent/40",
    iconBg: "from-accent/20 to-orange-500/10"
  },
  {
    icon: Database,
    title: "Bases de Données",
    description: "Conception et gestion de bases de données relationnelles et NoSQL. Expérience avec PostgreSQL, MongoDB et MySQL.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma ORM", "SQL", "Modélisation"],
    projects: ["Migration MongoDB", "Optimisation requêtes", "Schémas Prisma"],
    color: "text-success",
    accentColor: "bg-success/5",
    borderColor: "group-hover:border-success/40",
    iconBg: "from-success/20 to-success/10"
  },
  {
    icon: Braces,
    title: "DevOps & Infrastructure (en apprentissage)",
    description: "Apprentissage des pratiques DevOps, conteneurisation avec Docker et CI/CD. Connaissances académiques et projets personnels.",
    skills: ["Docker", "GitHub Actions", "CI/CD", "Linux", "Git", "Bash"],
    projects: ["Conteneurisation apps", "Pipeline CI/CD", "Déploiement Vercel"],
    color: "text-violet-500",
    accentColor: "bg-violet-500/5",
    borderColor: "group-hover:border-violet-500/40",
    iconBg: "from-violet-500/20 to-purple-500/10"
  },
  {
    icon: Zap,
    title: "Qualité & Bonnes Pratiques",
    description: "Application des bonnes pratiques de développement, revue de code et tests. Méthodologie Agile en entreprise.",
    skills: ["Code Review", "Testing", "Git", "Agile", "Documentation", "Clean Code"],
    projects: ["Revue de code Bifora", "Tests unitaires", "Documentation technique"],
    color: "text-warning",
    accentColor: "bg-warning/5",
    borderColor: "group-hover:border-warning/40",
    iconBg: "from-warning/20 to-warning/10"
  },
];
    accentColor: "bg-cyan-500/5",
    borderColor: "group-hover:border-cyan-500/40",
    iconBg: "from-cyan-500/10 to-blue-500/10"
  },
];

export function MyExpertise() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, (latest) => `${latest * 20}%`);

  return (
    <motion.section
      ref={containerRef}
      className="relative overflow-hidden py-32 my-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Subtle background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 h-[600px] w-[800px] rounded-full bg-primary/3 blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 h-[500px] w-[700px] rounded-full bg-accent/2 blur-[130px]" />
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-[0.012]" />

      <div
        ref={ref}
        className="container relative mx-auto px-6 z-10"
      >
        {/* En-tête de section */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 px-6 py-3 text-sm font-bold text-foreground mb-6 backdrop-blur-sm"
          >
            <Brain className="h-5 w-5 text-accent" />
            Compétences & Technologies
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            Mon Stack Technique
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Développeur Full Stack avec ~2 ans d&apos;expérience et étudiant en cybersécurité. 
            Passionné par l&apos;apprentissage des technologies modernes et des bonnes pratiques de sécurité.
          </motion.p>
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Une expertise complète en développement et cybersécurité pour créer des solutions digitales robustes, performantes et sécurisées.
          </motion.p>
        </div>

        {/* Grille d'expertise */}
        <div className="mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
            const isActive = activeCard === index;

            return (
              <motion.div
                key={area.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                onHoverStart={() => setActiveCard(index)}
                onHoverEnd={() => setActiveCard(null)}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3 },
                  }}
                  className={`
                    relative overflow-hidden rounded-2xl 
                    bg-card border-2 border-border
                    transition-all duration-500
                    hover:shadow-2xl hover:shadow-primary/10
                    ${area.borderColor}
                  `}
                >
                  {/* Gradient bar on top */}
                  <div className={`absolute inset-x-0 h-1.5 top-0 transform origin-left transition-transform duration-700 ${isActive ? 'scale-x-100' : 'scale-x-0'} bg-gradient-to-r ${area.iconBg.replace('bg-', '').replace('/10', '')}`}></div>

                  {/* Content */}
                  <div className="relative z-10 p-8">
                    <div className="flex items-start gap-5 mb-5">
                      <div
                        className={`
                          relative flex h-16 w-16 
                          items-center justify-center 
                          rounded-2xl bg-gradient-to-br ${area.iconBg}
                          border-2 ${area.color.replace('text-', 'border-')}/20
                          transition-all duration-500
                          group-hover:scale-110 group-hover:rotate-3
                        `}
                      >
                        <Icon
                          className={`h-8 w-8 ${area.color} transition-all duration-500 group-hover:scale-110`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                          {area.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {area.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`
                            inline-flex items-center rounded-xl 
                            ${area.accentColor}
                            px-3.5 py-1.5
                            text-xs font-semibold 
                            ${area.color}
                            border border-${area.color.replace('text-', '')}/10
                            transition-all duration-300
                            hover:border-${area.color.replace('text-', '')}/30
                            hover:scale-105
                            hover:shadow-sm
                          `}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Projects */}
                    <div className="pt-5 border-t border-border/50">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground/80 mb-3 font-bold flex items-center gap-2">
                        <div className={`h-1 w-1 rounded-full ${area.color.replace('text-', 'bg-')}`} />
                        Projets Représentatifs
                      </h4>
                      <ul className="space-y-2">
                        {area.projects.map((project, i) => (
                          <li key={i} className="text-sm flex items-center text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300">
                            <ChevronRight className={`h-4 w-4 mr-2 ${area.color} opacity-60`} />
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bannière formation continue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 mx-auto max-w-5xl"
        >
          <div className="rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-transparent border-2 border-border hover:border-primary/30 p-8 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2 text-foreground">Formation Continue & Veille Technologique</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Apprentissage constant des nouvelles technologies et meilleures pratiques en DevSecOps, 
                  à travers certifications professionnelles, workshops et contributions open-source.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 mt-4 md:mt-0">
                <span className="inline-flex items-center rounded-xl bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary">
                  DevSecBlueprint
                </span>
                <span className="inline-flex items-center rounded-xl bg-accent/10 border border-accent/20 px-4 py-2 text-sm font-semibold text-accent">
                  Certifications
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}