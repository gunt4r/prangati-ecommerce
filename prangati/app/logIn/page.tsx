"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import LogInContent from "@/components/LogInPage";
import { useGetAuth } from "@/api/auth/useAuth";
import Preloader from "@/components/ClientPreloader/Preloader";
export default function LogIn() {
  const router = useRouter();
  const { data: auth, isLoading: authLoading } = useGetAuth();
  const isAuthenticated = Boolean(auth && auth.status === 200);

  useEffect(() => {
    if (isAuthenticated) router.push("/products");
  }, [isAuthenticated, router]);
  if (authLoading) return <Preloader />;

  return (
    <section>
      <LogInContent />
    </section>
  );
}
