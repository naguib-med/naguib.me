"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

interface PageHeaderProps {
    title: string;
    description: string;
    gradient?: string;
}

export function PageHeader({ title, description, gradient = "from-primary via-accent to-secondary" }: PageHeaderProps) {
    return (
        <div className="relative overflow-hidden py-24 sm:py-32">
            {/* Cyber Grid Background */}
            <div className="absolute inset-0 cyber-grid opacity-20" />
            
            {/* Gradient Orbs */}
            <div className="absolute top-0 left-1/4 h-[500px] w-[700px] rounded-full bg-primary/5 blur-[150px]" />
            <div className="absolute bottom-0 right-1/4 h-[400px] w-[600px] rounded-full bg-accent/5 blur-[150px]" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />

            <div className="container relative">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto max-w-3xl text-center"
                >
                    {/* Decorative Icon */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex items-center justify-center mb-8"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-xl animate-pulse" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-border bg-card/80 backdrop-blur-sm">
                                <Shield className="h-10 w-10 text-primary" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={`bg-gradient-to-r ${gradient} bg-clip-text text-5xl sm:text-6xl font-bold tracking-tight text-transparent mb-6`}
                    >
                        {title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-lg sm:text-xl leading-8 text-muted-foreground max-w-2xl mx-auto"
                    >
                        {description}
                    </motion.p>

                    {/* Decorative Line */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-8 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
                    />
                </motion.div>
            </div>
        </div>
    );
}