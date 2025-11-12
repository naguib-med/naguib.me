"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Menu, X, ChevronRight, User, LogOut, Terminal } from "lucide-react"
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Certification", href: "/certification" },
    { name: "Contact", href: "/contact" },
]

export function Header() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut({
                redirect: false
            })
            setIsMobileMenuOpen(false)
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    return (
        <header
            className={cn(
                "fixed left-0 top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-background/95 backdrop-blur-xl border-b-2 border-border shadow-lg shadow-primary/5"
                    : "bg-transparent"
            )}
        >
            <nav className="container flex h-20 items-center justify-between">
                <Link
                    href="/"
                    className="group flex items-center gap-3 transition-transform hover:scale-105"
                >
                    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30">
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary to-accent opacity-20" />
                        <Shield className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 z-10" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Naguib Mohamed
                        </span>
                        <span className="text-xs font-semibold text-muted-foreground">
                            Étudiant M2 Cybersécurité
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 md:flex">
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group relative px-4 py-2"
                        >
                            <span
                                className={cn(
                                    "relative z-10 text-sm font-semibold transition-colors",
                                    pathname === item.href
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {item.name}
                            </span>
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                                    transition={{
                                        type: "spring",
                                        bounce: 0.25,
                                        duration: 0.5,
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                    <div className="ml-4 flex items-center gap-3">
                        <ThemeToggle />
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-10 w-10 rounded-xl border-2 border-border hover:border-primary/30"
                                    >
                                        {session.user?.image ? (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={session.user.image || ""}
                                                    alt={session.user.name || "Profile"}
                                                />
                                                <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                                            </Avatar>
                                        ) : (
                                            <User className="h-5 w-5" />
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-semibold">
                                                {session.user?.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {session.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-accent focus:bg-accent/10 focus:text-accent font-semibold"
                                        onClick={() => handleSignOut()}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button
                                asChild
                                className="group relative h-10 overflow-hidden rounded-xl bg-gradient-to-r from-primary to-accent px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 border-0"
                            >
                                <Link href="/contact">
                                    <span className="relative z-10 flex items-center gap-2 text-sm font-bold">
                                        <Terminal className="h-4 w-4" />
                                        Me Contacter
                                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="relative h-10 w-10 overflow-hidden rounded-xl border-2 border-border hover:border-primary/30"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ scale: 0, opacity: 0, rotate: -90 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0, opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-5 w-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ scale: 0, opacity: 0, rotate: 90 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    exit={{ scale: 0, opacity: 0, rotate: -90 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="h-5 w-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t-2 border-border bg-background/98 backdrop-blur-xl md:hidden"
                    >
                        <nav className="container flex flex-col py-6 space-y-2">
                            {navigation.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                                            pathname === item.href
                                                ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-2 border-primary/30"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground border-2 border-transparent"
                                        )}
                                    >
                                        {item.name}
                                        <ChevronRight className="h-4 w-4" />
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="mt-6 space-y-3 pt-6 border-t-2 border-border">
                                {session ? (
                                    <>
                                        <div className="flex items-center gap-3 rounded-xl px-4 py-3 bg-muted/50">
                                            {session.user?.image ? (
                                                <Avatar className="h-10 w-10 border-2 border-primary/30">
                                                    <AvatarImage
                                                        src={session.user.image}
                                                        alt={session.user.name || "Profile"}
                                                    />
                                                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <User className="h-6 w-6" />
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm font-semibold">{session.user?.name}</p>
                                                <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground border-2 border-transparent"
                                        >
                                            Dashboard
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleSignOut()}
                                            className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-accent hover:bg-accent/10 border-2 border-accent/30"
                                        >
                                            Log out
                                            <LogOut className="h-4 w-4" />
                                        </button>
                                    </>
                                ) : (
                                    <Button
                                        asChild
                                        className="w-full rounded-xl bg-gradient-to-r from-primary to-accent h-12 font-bold"
                                    >
                                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Terminal className="h-4 w-4 mr-2" />
                                            Me Contacter
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}