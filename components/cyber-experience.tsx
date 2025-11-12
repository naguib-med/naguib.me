"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Code,
  Briefcase,
  Calendar,
  MapPin,
  Building,
  ChevronRight,
  Award,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { experiences } from "@/lib/constants/experience-data";

const iconMap = {
  shield: Shield,
  code: Code,
  briefcase: Briefcase,
};

export function CyberExperience() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="relative overflow-hidden py-32 my-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 h-[600px] w-[800px] rounded-full bg-accent/3 blur-[150px]" />
        <div className="absolute bottom-1/3 left-1/4 h-[500px] w-[700px] rounded-full bg-primary/3 blur-[130px]" />
      </div>

      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div ref={ref} className="container relative mx-auto px-6 z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 px-6 py-3 text-sm font-bold text-foreground mb-6 backdrop-blur-sm"
          >
            <Briefcase className="h-5 w-5 text-accent" />
            Expériences Professionnelles
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            Parcours DevSecOps & Développement
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            De développeur Full Stack à étudiant en cybersécurité, un parcours orienté vers l&apos;apprentissage de la sécurisation des applications.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-secondary" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = iconMap[exp.icon as keyof typeof iconMap] || Briefcase;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-24"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-5 top-8 h-8 w-8 rounded-xl ${exp.highlight
                    ? "bg-gradient-to-br from-accent to-primary shadow-lg shadow-accent/30"
                    : "bg-gradient-to-br from-muted to-muted-foreground/20"
                    } flex items-center justify-center border-4 border-background z-10`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>

                  {/* Card */}
                  <div className={`cyber-border rounded-2xl border-2 ${exp.highlight ? "border-accent/30" : "border-border"
                    } bg-card backdrop-blur-sm p-8 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 group`}>
                    {exp.highlight && (
                      <div className="absolute top-6 right-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-accent to-accent/80 text-white text-xs font-bold shadow-lg shadow-accent/30">
                          <Award className="h-3.5 w-3.5" />
                          Expérience clé
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                            <Building className="h-5 w-5" />
                            {exp.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="font-medium">{exp.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          <span className="font-medium">{exp.location}</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-muted text-foreground text-xs font-bold">
                          {exp.type}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-3 mb-6">
                      {exp.description.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <ChevronRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20">
                        <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent" />
                          Réalisations clés
                        </h4>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 mt-0.5 text-success shrink-0" />
                              <span className="text-foreground/90">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Technologies */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-bold">
                        Technologies & Compétences
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => {
                          const colorMap = {
                            security: "from-accent/10 to-accent/5 border-accent/20 text-accent",
                            frontend: "from-primary/10 to-primary/5 border-primary/20 text-primary",
                            backend: "from-secondary/10 to-secondary/5 border-secondary/20 text-secondary",
                            devops: "from-success/10 to-success/5 border-success/20 text-success",
                            default: "from-muted to-muted/50 border-border text-foreground",
                          };

                          const colorClass = colorMap[tech.type as keyof typeof colorMap] || colorMap.default;

                          return (
                            <span
                              key={i}
                              className={`inline-flex items-center rounded-xl bg-gradient-to-br ${colorClass} border px-3 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-sm`}
                            >
                              {tech.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Découvrez plus en détail mon parcours et mes compétences
          </p>
          <Button
            className="rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 font-bold"
          >
            <Terminal className="h-5 w-5 mr-2" />
            Télécharger mon CV complet
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function Button({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
