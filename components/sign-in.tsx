
"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"


export default function SignIn() {
    return (
        <Button onClick={() => signIn("google")}>Sign in with Google</Button>
    )
}