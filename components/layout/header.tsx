"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Menu, X, ChevronRight, User, LogOut } from "lucide-react"
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
                    ? "bg-background/80 backdrop-blur-xl shadow-[0_0_15px_0_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_0_rgba(0,0,0,0.3)]"
                    : "bg-transparent"
            )}
        >
            <nav className="container flex h-20 items-center justify-between">
                <Link
                    href="/"
                    className="group flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-[1px]">
                        <div className="absolute inset-0 animate-[spin_20s_linear_infinite] bg-gradient-to-r from-primary via-violet-500 to-blue-500 opacity-20" />
                        <div className="z-10 flex h-full w-full items-center justify-center rounded-xl bg-background/80 backdrop-blur-sm">
                            <Code className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                        </div>
                    </div>
                    <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-xl font-bold text-transparent">
                        Naguib
                    </span>
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
                                    "relative z-10 text-sm font-medium transition-colors",
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
                                    className="absolute inset-0 z-0 rounded-full bg-primary/10"
                                    transition={{
                                        type: "spring",
                                        bounce: 0.25,
                                        duration: 0.5,
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                    <div className="ml-4 flex items-center gap-2">
                        <ThemeToggle />
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-9 w-9 rounded-full"
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
                                <DropdownMenuContent align="end">
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium">
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
                                        className="text-red-600 focus:bg-red-50 focus:text-red-600"
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
                                className="group relative h-9 overflow-hidden rounded-full bg-gradient-to-r from-primary via-violet-500 to-blue-500 px-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_4px_rgba(124,58,237,0.3)]"
                            >
                                <Link href="/contact">
                                    <span className="relative z-10 flex items-center gap-1 text-sm">
                                        Hire Me
                                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="relative h-9 w-9 overflow-hidden rounded-full p-0"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="h-5 w-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
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
                        className="border-t border-primary/10 bg-background/80 backdrop-blur-xl md:hidden"
                    >
                        <nav className="container flex flex-col py-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                        pathname === item.href
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            ))}
                            <div className="mt-4 space-y-2 px-4">
                                {session ? (
                                    <>
                                        <div className="flex items-center gap-2 rounded-lg px-4 py-3">
                                            {session.user?.image ? (
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage
                                                        src={session.user.image}
                                                        alt={session.user.name || "Profile"}
                                                    />
                                                    <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
                                                </Avatar>
                                            ) : (
                                                <User className="h-5 w-5" />
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium">{session.user?.name}</p>
                                                <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                                        >
                                            Dashboard
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href="/settings"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                                        >
                                            Settings
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleSignOut()}
                                            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
                                        >
                                            Log out
                                            <LogOut className="h-4 w-4" />
                                        </button>
                                    </>
                                ) : (
                                    <Button
                                        asChild
                                        className="w-full rounded-lg bg-gradient-to-r from-primary via-violet-500 to-blue-500"
                                    >
                                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                            Hire Me
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