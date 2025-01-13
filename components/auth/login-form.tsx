'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export function LoginForm() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });

        setIsLoading(false);

        if (result?.error) {
            toast({
                title: 'Error',
                description: 'Invalid credentials',
                variant: 'destructive',
            });
            return;
        }

        router.push("/");
    }

    async function onSocialSignIn(provider: string) {
        setIsLoading(true);
        await signIn(provider, {
            redirect: false,
            redirectTo: '/',

        });
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button variant="link" type="button" onClick={() => router.push('/forgot-password')}>
                        Forgot password?
                    </Button>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
            <div className="flex items-center space-x-4">
                <hr className="w-full" />
                <p className="text-sm text-muted-foreground">OR</p>
                <hr className="w-full" />
            </div>
            <div className="flex flex-col space-y-4">
                <Button
                    variant="outline"
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                    Continue with Google
                </Button>
                <Button onClick={() => onSocialSignIn('github')} className="w-full">
                    Sign in with GitHub
                </Button>
            </div>
        </Form>
    );
}