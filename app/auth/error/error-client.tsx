"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] py-8">
      <h1 className="text-2xl font-bold mb-4">Erreur d&apos;authentification</h1>
      <div className="p-4 bg-red-50 text-red-700 rounded-md">
        {error ||
          "Une erreur inconnue s'est produite pendant l'authentification."}
      </div>
      <a href="/auth/signin" className="mt-4 underline">
        Réessayer
      </a>
    </div>
  );
}
