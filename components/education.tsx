"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import {
    GraduationCap,
    MapPin,
    Calendar,
    BookOpen,
    ChevronRight,
    Lightbulb,
} from "lucide-react";

import { educationList } from "@/lib/constants";

export function Education() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, (latest) => `${latest * 15}%`);

    const [educationRef, educationInView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden py-24 sm:py-32 my-12"
        >
            {/* Arrière-plan amélioré */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 bg-grid-pattern opacity-[0.03]"
                    style={{ y: backgroundY }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-30" />
                <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[120px] -z-10" />
                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px] -z-10" />
            </div>

            <motion.div
                ref={educationRef}
                initial={{ opacity: 0 }}
                animate={educationInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="container relative mx-auto px-6"
            >
                {/* En-tête de section */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={educationInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
                    >
                        <GraduationCap className="h-4 w-4" />
                        Formation Académique
                    </motion.div>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={educationInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl"
                    >
                        <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
                            Parcours Académique
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={educationInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-lg text-muted-foreground/90 max-w-xl mx-auto"
                    >
                        Mon parcours académique pluridisciplinaire combine une expertise technique en développement web
                        et en technologies de l&apos;information avec des compétences en management et stratégie d&apos;entreprise.
                    </motion.p>
                </div>

                {/* Timeline éducation améliorée */}
                <div className="mx-auto mt-16 max-w-4xl">
                    {educationList.map((item, index) => {
                        const isHighlighted = index === 0; // Premier élément mis en évidence (formation la plus récente)

                        return (
                            <motion.div
                                key={index}
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
                                    <div className={`h-3 w-3 rounded-full ${isHighlighted ? 'bg-violet-500' : 'bg-primary'}`} />
                                    <div className={`absolute h-5 w-5 animate-ping rounded-full ${isHighlighted ? 'bg-violet-500/20' : 'bg-primary/20'}`} />
                                </div>
                                <div className="absolute left-[11px] top-14 h-[calc(100%-56px)] w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent last:hidden" />

                                {/* Carte de formation */}
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
                    ${isHighlighted ? 'bg-gradient-to-br from-primary/5 to-transparent border-primary/10' : ''}
                  `}
                                >
                                    {/* Barre supérieure pour formation principale */}
                                    {isHighlighted && (
                                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-blue-500"></div>
                                    )}

                                    <div className="space-y-5">
                                        {/* En-tête de formation */}
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                                                    {item.title}
                                                </h3>
                                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1.5">
                                                        <BookOpen className="h-4 w-4 text-primary/70" />
                                                        {item.institution}
                                                    </span>
                                                    <span className="hidden md:inline">•</span>
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4 text-primary/70" />
                                                        {item.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {item.period}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description du diplôme */}
                                        {item.description && item.description.length > 0 && (
                                            <div className="space-y-3 border-t border-border/30 pt-4">
                                                <h4 className="text-sm font-medium text-foreground/90">Programme & Modules</h4>
                                                <ul className="text-sm text-muted-foreground space-y-1.5">
                                                    {item.description.map((desc, descIndex) => (
                                                        <li key={descIndex} className="flex gap-2">
                                                            <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary/50" />
                                                            <span>{desc}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Tags et compétences */}
                                        {item.tags && item.tags.length > 0 && (
                                            <div className="space-y-3 border-t border-border/30 pt-4">
                                                <h4 className="text-sm font-medium text-foreground/90">Domaines & Spécialisations</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags.map((tag, tagIndex) => (
                                                        <span
                                                            key={tagIndex}
                                                            className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500 ring-1 ring-inset ring-blue-500/20 transition-all duration-200 hover:scale-105"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bannière compétences continues */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-16 mx-auto max-w-4xl"
                >
                    <div className="rounded-2xl bg-gradient-to-r from-blue-500/5 via-card/50 to-primary/5 border border-border/40 p-6 backdrop-blur-sm">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                                <Lightbulb className="h-6 w-6" />
                            </div>
                            <div className="flex-grow space-y-1">
                                <h3 className="text-lg font-semibold">Formation continue</h3>
                                <p className="text-sm text-muted-foreground">
                                    Je complète régulièrement mes connaissances par l&apos;apprentissage de nouvelles technologies et méthodologies via des cours en ligne, bootcamps et certifications.
                                </p>
                            </div>
                            <div className="flex shrink-0 gap-3 mt-4 md:mt-0">
                                <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                                    Udemy
                                </span>
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    Certifications
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}