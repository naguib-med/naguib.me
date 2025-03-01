"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
    title: string;
    description: string;
    gradient?: string;
}

export function PageHeader({ title, description, gradient = "from-primary via-primary/80 to-primary/60" }: PageHeaderProps) {
    return (
        <div className="relative overflow-hidden bg-grid-pattern bg-grid py-24 sm:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background/30" />

            <div className="container relative">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-2xl text-center"
                >
                    <h1 className={`bg-gradient-to-r ${gradient} bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl`}>
                        {title}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground">
                        {description}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}