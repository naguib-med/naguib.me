"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Server,
  Database,
  Shield,
  Layers,
  Workflow,
  Rocket,
} from "lucide-react";

const expertiseAreas = [
  {
    icon: Code,
    title: "Frontend Mastery",
    description:
      "Crafting immersive, pixel-perfect web experiences with cutting-edge technologies.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    color: "text-blue-500",
    accentColor: "bg-blue-500/10 hover:bg-blue-500/20",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    description:
      "Designing scalable, secure server-side solutions with elegant, efficient patterns.",
    skills: ["Node.js", "Spring Boot", "GraphQL", "Microservices", "REST APIs"],
    color: "text-green-500",
    accentColor: "bg-green-500/10 hover:bg-green-500/20",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description:
      "Transforming raw data into intelligent, performant database architectures.",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Redis", "Data Modeling"],
    color: "text-purple-500",
    accentColor: "bg-purple-500/10 hover:bg-purple-500/20",
  },
  {
    icon: Shield,
    title: "DevSecOps",
    description:
      "Integrating security as a core principle throughout the software development lifecycle.",
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Security Audits",
      "Cloud Security",
    ],
    color: "text-red-500",
    accentColor: "bg-red-500/10 hover:bg-red-500/20",
  },
  {
    icon: Layers,
    title: "Cloud Native",
    description:
      "Architecting resilient, scalable cloud solutions that push technological boundaries.",
    skills: ["AWS", "Vercel", "Firebase", "Serverless", "Cloud Native"],
    color: "text-indigo-500",
    accentColor: "bg-indigo-500/10 hover:bg-indigo-500/20",
  },
  {
    icon: Workflow,
    title: "Engineering Workflow",
    description:
      "Optimizing development processes with agile methodologies and collaborative innovation.",
    skills: ["Git", "Agile", "TDD", "Design Patterns", "Team Collaboration"],
    color: "text-cyan-500",
    accentColor: "bg-cyan-500/10 hover:bg-cyan-500/20",
  },
];

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export function MyExpertise() {
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
            <Rocket className="h-4 w-4 animate-pulse text-primary" />
            Professional Capabilities
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
          >
            Engineering Expertise
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-muted-foreground"
          >
            Innovative solutions at the intersection of technology and
            creativity
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon;
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
                className="group perspective-1000"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    rotateX: 5,
                    rotateY: -5,
                    transition: { duration: 0.3 },
                  }}
                  className={`
                    relative overflow-hidden rounded-3xl 
                    bg-gradient-to-br from-background/10 to-background/5
                    border border-transparent 
                    transition-all duration-300
                    hover:border-primary/30
                    shadow-xl hover:shadow-2xl
                  `}
                >
                  <div
                    className={`
                      absolute inset-0 
                      opacity-0 group-hover:opacity-100 
                      transition-opacity duration-500
                    `}
                  />

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`
                        relative flex h-12 w-12 
                        items-center justify-center 
                        rounded-xl bg-background/50
                        border border-primary/10
                        transition-all duration-300
                        group-hover:border-primary/30
                      `}
                      >
                        <Icon
                          className={`h-6 w-6 ${area.color} transition-transform group-hover:scale-110`}
                        />
                      </div>
                      <h3 className="text-xl font-semibold">{area.title}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 h-16 opacity-80 group-hover:opacity-100 transition-opacity">
                      {area.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`
                            rounded-full 
                            bg-background/50 
                            px-3 py-1 
                            text-xs font-medium 
                            ${area.color}
                            border border-transparent
                            transition-all duration-300
                            hover:border-primary/30
                            hover:bg-primary/10
                          `}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.section>
  );
}
