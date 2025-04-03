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
    description: "Création d'applications web réactives et performantes avec les technologies modernes.",
    skills: ["React", "Redux", "TypeScript", "JavaScript", "TailwindCSS", "Vue.js"],
    projects: ["App CRA & Fiches de paie (Entreprise/M2)", "Dashboard d'analytics", "Applications SPA"],
    color: "text-blue-500",
    accentColor: "bg-blue-500/10",
    borderColor: "group-hover:border-blue-500/30"
  },
  {
    icon: Server,
    title: "Développement Backend",
    description: "Architecture et implémentation de systèmes robustes et évolutifs.",
    skills: ["Node.js", "Express", "Java Spring", "RESTful APIs", "GraphQL", "Prisma"],
    projects: ["API CRA & Fiches de paie (Entreprise)", "Automatisation envoi documents", "Systèmes d'authentification"],
    color: "text-green-500",
    accentColor: "bg-green-500/10",
    borderColor: "group-hover:border-green-500/30"
  },
  {
    icon: Database,
    title: "Bases de Données",
    description: "Conception et optimisation de structures de données pour applications performantes.",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "SQL", "Redis", "NoSQL"],
    projects: ["Optimisation de requêtes", "Migration de données", "Modélisation"],
    color: "text-amber-500",
    accentColor: "bg-amber-500/10",
    borderColor: "group-hover:border-amber-500/30"
  },
  {
    icon: Shield,
    title: "DevSecOps",
    description: "Intégration de la sécurité dans le cycle de développement et déploiement.",
    skills: ["OWASP", "CI/CD", "Terraform", "Docker", "Kubernetes", "Vault"],
    projects: ["Pipeline sécurisé", "Audit de vulnérabilités", "DevSecBlueprint"],
    color: "text-red-500",
    accentColor: "bg-red-500/10",
    borderColor: "group-hover:border-red-500/30"
  },
  {
    icon: Braces,
    title: "Développement Java",
    description: "Conception et développement d'applications robustes avec Java et ses frameworks.",
    skills: ["Spring Boot", "Hibernate", "Java Swing", "Microservices", "JUnit", "Maven"],
    projects: ["API gestion utilisateurs (Lyon 1)", "App de rendez-vous médicaux (type Doctolib)", "Micro spring framework"],
    color: "text-indigo-500",
    accentColor: "bg-indigo-500/10",
    borderColor: "group-hover:border-indigo-500/30"
  },
  {
    icon: Zap,
    title: "Performance & Optimisation",
    description: "Amélioration des performances et optimisation des applications web.",
    skills: ["Web Vitals", "Caching", "Lazy Loading", "Bundling", "Lighthouse", "SEO"],
    projects: ["Optimisation de chargement", "PWA", "Audit de performance"],
    color: "text-yellow-500",
    accentColor: "bg-yellow-500/10",
    borderColor: "group-hover:border-yellow-500/30"
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
      className="relative overflow-hidden py-24 my-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Arrière-plan interactif */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-30" />
        <div className="absolute top-0 left-1/3 h-[500px] w-[800px] rounded-full bg-primary/5 blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-blue-500/5 blur-[100px] -z-10" />
      </div>

      <div
        ref={ref}
        className="container relative mx-auto px-6 z-10"
      >
        {/* En-tête de section */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
          >
            <Brain className="h-4 w-4" />
            Stack Technique & Expertise
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
              Technologies & Compétences
            </span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground/90 max-w-xl mx-auto"
          >
            Un ensemble complet de compétences et technologies pour transformer vos idées en solutions digitales robustes et sécurisées.
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
                    scale: 1.02,
                    transition: { duration: 0.3 },
                  }}
                  className={`
                    relative overflow-hidden rounded-2xl 
                    bg-card/50 border border-border/40
                    transition-all duration-300 
                    hover:shadow-lg hover:shadow-primary/10
                    ${area.borderColor}
                  `}
                >
                  {/* Effet de gradient sur le bord supérieur */}
                  <div className={`absolute inset-x-0 h-1 top-0 transform origin-left transition-transform duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0'} bg-gradient-to-r from-primary to-${area.color.replace('text-', '')}`}></div>

                  {/* Contenu principal */}
                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`
                          relative flex h-12 w-12 
                          items-center justify-center 
                          rounded-xl ${area.accentColor}
                          border border-primary/10
                          transition-all duration-300
                          group-hover:shadow-sm
                          group-hover:border-opacity-40
                          group-hover:scale-110
                        `}
                      >
                        <Icon
                          className={`h-6 w-6 ${area.color} transition-transform group-hover:scale-110`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {area.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 group-hover:text-foreground/90 transition-colors duration-300">
                      {area.description}
                    </p>

                    {/* Compétences */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {area.skills.slice(0, 6).map((skill) => (
                        <span
                          key={skill}
                          className={`
                            inline-flex items-center rounded-full 
                            ${area.accentColor}
                            px-3 py-1 
                            text-xs font-medium 
                            ${area.color}
                            ring-1 ring-inset ring-primary/10
                            transition-all duration-300
                            hover:ring-primary/20
                            hover:scale-105
                          `}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Projets représentatifs */}
                    <div className="mt-4 pt-4 border-t border-border/20">
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                        Projets concrets
                      </h4>
                      <ul className="space-y-1">
                        {area.projects.map((project, i) => (
                          <li key={i} className="text-xs flex items-center text-muted-foreground group-hover:text-foreground/80">
                            <ChevronRight className="h-3 w-3 mr-1 inline opacity-70" />
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

        {/* Bannière additionnelle pour formation continue */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 mx-auto max-w-4xl"
        >
          <div className="rounded-2xl bg-card/30 border border-border/40 p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-1">Formation continue & veille technologique</h3>
                <p className="text-sm text-muted-foreground">
                  Je me forme continuellement sur les nouvelles technologies et meilleures pratiques, notamment en DevSecOps, à travers des certifications, ateliers et projets open-source.
                </p>
              </div>
              <div className="flex shrink-0 gap-2 mt-4 md:mt-0">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  DevSecBlueprint
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
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