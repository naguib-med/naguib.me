"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Shield,
  Award,
  CheckCircle2,
  Clock,
  Target,
  Lock,
  KeyRound,
  FileSearch,
  Network,
  ShieldCheck,
  Cpu,
  Terminal,
} from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "EBIOS RM (Introduction)",
    org: "ANSSI",
    icon: ShieldCheck,
    status: "Certifié",
    color: "accent",
    description: "Méthodologie d'analyse et de gestion des risques SSI",
    skills: ["Analyse des risques", "Gestion SSI", "Conformité"],
  },
  {
    id: 2,
    name: "Pre-Security Learning Path",
    org: "TryHackMe",
    icon: Lock,
    status: "Certifié",
    color: "primary",
    description: "Fondamentaux de la cybersécurité et des réseaux",
    skills: ["Fondamentaux", "Réseaux", "Linux"],
  },
  {
    id: 3,
    name: "Cyber Security 101",
    org: "TryHackMe",
    icon: Shield,
    status: "Certifié",
    color: "secondary",
    description: "Introduction à la sécurité informatique",
    skills: ["Sécurité SI", "Défense", "Attaque"],
  },
  {
    id: 4,
    name: "Jr Penetration Tester",
    org: "TryHackMe",
    icon: KeyRound,
    status: "Certifié",
    color: "accent",
    description: "Tests d'intrusion et méthodologies de pentesting",
    skills: ["Pentesting", "Exploitation", "Post-exploitation"],
  },
  {
    id: 5,
    name: "Web App Pentesting",
    org: "Formation continue",
    icon: FileSearch,
    status: "En cours",
    color: "warning",
    description: "Tests de sécurité des applications web",
    skills: ["OWASP Top 10", "Vulnérabilités Web", "Exploitation"],
  },
  {
    id: 6,
    name: "DevSecOps Professional",
    org: "À venir",
    icon: Network,
    status: "Planifié",
    color: "success",
    description: "Intégration de la sécurité dans le cycle DevOps",
    skills: ["CI/CD Sécurisé", "SAST/DAST", "Container Security"],
  },
  {
    id: 7,
    name: "Cisco CCNA",
    org: "Master 2 OPSIE",
    icon: Cpu,
    status: "Préparation",
    color: "primary",
    description: "Certification réseau Cisco",
    skills: ["Réseaux", "Routing", "Switching"],
  },
  {
    id: 8,
    name: "ITIL Foundation",
    org: "Master 2 OPSIE",
    icon: Terminal,
    status: "Préparation",
    color: "secondary",
    description: "Gestion des services IT",
    skills: ["ITSM", "Best Practices", "Gouvernance IT"],
  },
];

const statusConfig = {
  "Certifié": {
    badge: "Obtenu",
    color: "from-success to-success/80",
    textColor: "text-success",
    icon: CheckCircle2,
  },
  "En cours": {
    badge: "En cours",
    color: "from-warning to-warning/80",
    textColor: "text-warning",
    icon: Clock,
  },
  "Planifié": {
    badge: "Planifié",
    color: "from-primary to-primary/80",
    textColor: "text-primary",
    icon: Target,
  },
  "Préparation": {
    badge: "Préparation",
    color: "from-secondary to-secondary/80",
    textColor: "text-secondary",
    icon: Clock,
  },
};

export function CertificationsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const colorMap = {
    accent: "from-accent/20 to-accent/10 border-accent/30 text-accent",
    primary: "from-primary/20 to-primary/10 border-primary/30 text-primary",
    secondary: "from-secondary/20 to-secondary/10 border-secondary/30 text-secondary",
    success: "from-success/20 to-success/10 border-success/30 text-success",
    warning: "from-warning/20 to-warning/10 border-warning/30 text-warning",
  };

  return (
    <section className="relative overflow-hidden py-32 my-16 bg-gradient-to-b from-background to-muted/30">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 h-[600px] w-[800px] rounded-full bg-accent/3 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/3 h-[500px] w-[700px] rounded-full bg-primary/3 blur-[130px]" />
      </div>

      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div ref={ref} className="container relative mx-auto px-6 z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-primary/10 px-6 py-3 text-sm font-bold text-foreground mb-6 backdrop-blur-sm"
          >
            <Award className="h-5 w-5 text-accent" />
            Certifications & Formations
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            Certifications Cybersécurité
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Certifications professionnelles et formations continues pour une expertise technique pointue en cybersécurité et DevSecOps.
          </motion.p>
        </div>

        {/* Certifications Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            const status = statusConfig[cert.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const colorClass = colorMap[cert.color as keyof typeof colorMap];

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="cyber-border h-full rounded-2xl border-2 border-border bg-card backdrop-blur-sm p-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} border-2 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${status.color} text-white text-xs font-bold shadow-lg`}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {cert.name}
                    </h3>
                    
                    <div className="text-sm font-semibold text-muted-foreground">
                      {cert.org}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded-lg bg-muted text-foreground font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { value: "4", label: "Certifications", sublabel: "Obtenues" },
            { value: "2", label: "En cours", sublabel: "de validation" },
            { value: "2", label: "Planifiées", sublabel: "2025-2026" },
            { value: "100%", label: "Engagement", sublabel: "formation continue" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
