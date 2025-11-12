"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Shield,
  CheckCircle2,
  Sparkles,
  Trophy,
} from "lucide-react";
import { educationList } from "@/lib/constants";

export function CyberEducation() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section className="relative overflow-hidden py-32 my-16">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[800px] rounded-full bg-primary/3 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 h-[500px] w-[700px] rounded-full bg-accent/3 blur-[130px]" />
      </div>

      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div ref={ref} className="container relative mx-auto px-6 z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-3 text-sm font-bold text-foreground mb-6 backdrop-blur-sm"
          >
            <GraduationCap className="h-5 w-5 text-primary" />
            Formations & Diplômes
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
          >
            Parcours Académique d&apos;Excellence
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Une formation complète en cybersécurité et développement, certifiée par l&apos;ANSSI et reconnue pour son excellence académique.
          </motion.p>
        </div>

        {/* Education Cards */}
        <div className="max-w-5xl mx-auto space-y-8">
          {educationList.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`cyber-border rounded-2xl border-2 ${edu.highlight ? "border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5" : "border-border bg-card"
                } backdrop-blur-sm p-8 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative`}>
                {/* Highlight Badge */}
                {edu.highlight && (
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-accent via-accent to-orange-500 text-white text-xs font-bold shadow-lg shadow-accent/30">
                      <Shield className="h-4 w-4" />
                      {edu.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${edu.highlight
                      ? "bg-gradient-to-br from-accent/20 to-primary/20 text-accent"
                      : "bg-gradient-to-br from-primary/20 to-secondary/20 text-primary"
                    } group-hover:scale-110 transition-transform duration-300`}>
                    <GraduationCap className="h-8 w-8" />
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-2xl font-bold mb-2 ${edu.highlight
                        ? "bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                        : "text-foreground group-hover:text-primary transition-colors"
                      }`}>
                      {edu.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm mb-3">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Award className="h-4 w-4 text-primary" />
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-accent" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-secondary" />
                        {edu.period}
                      </div>
                    </div>

                    {/* Special Mentions */}
                    {(edu.title.includes("Major") || edu.title.includes("1er tiers")) && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-warning/20 to-warning/10 border border-warning/30 mb-4">
                        <Trophy className="h-4 w-4 text-warning" />
                        <span className="text-sm font-bold text-warning">
                          {edu.title.includes("Major") ? "Major de Promotion" : "1er tiers de promotion"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2.5 mb-6">
                  {edu.description.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${edu.highlight ? "text-accent" : "text-primary"
                        }`} />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div>
                  <div className="flex flex-wrap gap-2">
                    {edu.tags?.map((tag, i) => {
                      const isHighlightTag = tag.includes("ANSSI") || tag.includes("Major") || tag.includes("tiers") || tag.includes("Label");

                      return (
                        <span
                          key={i}
                          className={`inline-flex items-center rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-sm ${isHighlightTag
                              ? "bg-gradient-to-r from-accent/20 to-accent/10 border-2 border-accent/30 text-accent"
                              : edu.highlight
                                ? "bg-primary/10 border border-primary/20 text-primary"
                                : "bg-muted border border-border text-foreground"
                            }`}
                        >
                          {isHighlightTag && <Sparkles className="h-3 w-3 mr-1" />}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Shield, label: "Label ANSSI", value: "SecNumÉdu", color: "accent" },
            { icon: Trophy, label: "Excellence", value: "1er/101", color: "warning" },
            { icon: GraduationCap, label: "Diplômes", value: "4 Masters", color: "primary" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm p-6 text-center hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <stat.icon className={`h-8 w-8 mx-auto mb-3 text-${stat.color}`} />
              <div className={`text-3xl font-bold mb-1 text-${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
