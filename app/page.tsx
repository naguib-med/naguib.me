"use client";
import { useSession } from "next-auth/react";
import SignIn from "@/components/sign-in";
import UserDashboard from "@/components/user-dashboard";


export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <UserDashboard user={session.user} />
      ) : (
        <SignIn />
      )}
    </div>
  );
}
