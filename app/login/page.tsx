"use client";

import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>
                <LoginForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link href="/register" className="hover:text-brand underline underline-offset-4">
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>

                <div className="flex items-center space-x-4">
                    <hr className="w-full" />
                    <p className="text-sm text-muted-foreground">OR</p>
                    <hr className="w-full" />
                </div>
                <div className="flex flex-col space-y-4">
                    <Button onClick={() => signIn('google')} className="w-full">
                        Sign in with Google
                    </Button>

                    <Button onClick={() => signIn('github')} className="w-full">
                        Sign in with GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
}