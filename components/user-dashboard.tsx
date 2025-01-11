"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function UserDashboard({ user }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                {user?.image && (
                    <Image
                        src="https://api.dicebear.com/9.x/lorelei/svg?seed=Mackenzie&backgroundType=solid,gradientLinear&backgroundRotation=0,360,50,30,40,20,10&backgroundColor=d1d4f9,c0aede,b6e3f4,ffd5dc,ffdfbf"
                        alt={user.name}
                        width={40}
                        height={40}
                        priority
                        className="rounded-full"

                    />
                )}
                <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
            </div>

            <Button
                variant="outline"
                onClick={() => signOut()}
            >
                Sign out
            </Button>
        </div>
    )
}