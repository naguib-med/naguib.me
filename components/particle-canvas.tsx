"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let particles: Array<{
            x: number
            y: number
            radius: number
            vx: number
            vy: number
            alpha: number
        }> = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticles = () => {
            particles = []
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000)

            for (let i = 0; i < numberOfParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1 + 0.5,
                    vx: Math.random() * 0.2 - 0.1,
                    vy: Math.random() * 0.2 - 0.1,
                    alpha: Math.random() * 0.5 + 0.2,
                })
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach((particle) => {
                particle.x += particle.vx
                particle.y += particle.vy

                if (particle.x < 0) particle.x = canvas.width
                if (particle.x > canvas.width) particle.x = 0
                if (particle.y < 0) particle.y = canvas.height
                if (particle.y > canvas.height) particle.y = 0

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(var(--primary-rgb), ${particle.alpha})`
                ctx.fill()
            })

            requestAnimationFrame(animate)
        }

        resize()
        createParticles()
        animate()

        window.addEventListener("resize", () => {
            resize()
            createParticles()
        })

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [])

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 -z-10"
        />
    )
}