"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
    project: {
        title: string;
        description: string;
        image: string;
        tags: string[];
        demoUrl: string;
        githubUrl: string;
    };
    index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    return (
        <motion.div
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
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background/10 to-background/5 border border-transparent transition-all duration-300 hover:border-primary/30 shadow-xl hover:shadow-2xl"
            >
                <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-border/20">
                        <Link
                            href={project.demoUrl}
                            className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                            Demo
                        </Link>
                        <Link
                            href={project.githubUrl}
                            className="group/link flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
                            Code
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}