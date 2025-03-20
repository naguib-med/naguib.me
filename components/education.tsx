"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

import { educationList } from "@/lib/constants";

export function Education() {
    const [educationRef, educationInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section
            ref={educationRef}
            className="relative overflow-hidden py-24 sm:py-32"
        >
            <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background/50" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={educationInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="container relative"
            >
                <div className="mx-auto max-w-2xl text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={educationInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary"
                    >
                        <GraduationCap className="h-4 w-4" />
                        Formation
                    </motion.div>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={educationInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl"
                    >
                        Parcours Académique
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={educationInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-muted-foreground"
                    >
                        Mon parcours académique pluridisciplinaire combine une expertise technique en développement web
                        et en technologies de l&apos;information avec des compétences en management et stratégie d&apos;entreprise.
                    </motion.p>
                </div>

                <div className="mx-auto mt-16 max-w-3xl">
                    {educationList.map((item, index) => (
                        <motion.div
                            key={index}
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
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                                            {item.period}
                                        </span>
                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" />
                                            {item.location}
                                        </span>
                                        <span className="font-medium">
                                            {item.institution}
                                        </span>
                                    </div>

                                    {item.description && item.description.length > 0 && (
                                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                            {item.description.map((desc, descIndex) => (
                                                <li key={descIndex}>{desc}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}