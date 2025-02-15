"use client";
import { useRef } from "react";

import { useTransform, useSpring, motion } from "framer-motion";
import { useScroll } from "framer-motion";

import {
  Code,
  ChevronRight,
  Newspaper,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { MagneticButton } from "@/components/magnetic-button";

export function Hero() {
  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollY, [0, 300], [0, 50]), springConfig);
  const opacity = useSpring(
    useTransform(scrollY, [0, 300], [1, 0]),
    springConfig
  );
  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-12 py-32"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6 text-center"
        >
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full bg-gradient-to-r from-primary via-violet-500 to-blue-500 opacity-20 blur-2xl" />
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-background via-background to-background/90" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-primary/10 bg-background/50 backdrop-blur-sm">
              <Code className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Engineering
              <br />
              <span className="relative">
                <span className="absolute -inset-1 block animate-[pulse_4s_ease-in-out_infinite] rounded-lg bg-gradient-to-r from-primary via-violet-500 to-blue-500 opacity-30 blur-xl" />
                <span className="relative bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
                  Secure Solutions
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto max-w-[42rem] text-muted-foreground sm:text-lg md:text-xl"
            >
              Security-minded Fullstack Developer building robust web
              applications with React & Node.js/Spring Boot.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton>
              <Button
                size="lg"
                className="group relative h-14 overflow-hidden rounded-full bg-gradient-to-r from-primary via-violet-500 to-blue-500 px-8 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(124,58,237,0.3)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Portfolio
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button
                variant="outline"
                size="lg"
                className="group relative h-14 overflow-hidden rounded-full border-primary/20 px-8 transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Read Blog
                  <Newspaper className="h-4 w-4 transition-transform group-hover:scale-110" />
                </span>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center gap-8 rounded-2xl border border-primary/10 bg-background/50 px-8 py-4 backdrop-blur-sm"
          >
            {[
              { label: "Projects", value: "5+" },
              { label: "Blog Posts", value: "+2" },
              { label: "Experience", value: "2+ Years" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-4">
                {i > 0 && <div className="h-8 w-[1px] bg-primary/10" />}
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Scroll to explore
            </div>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="h-12 w-[1px] bg-gradient-to-b from-primary/50 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
