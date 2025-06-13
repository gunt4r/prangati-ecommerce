"use client";
import { useRouter } from "next/navigation";

import { useGetAuth } from "@/api/auth/useAuth";
import Preloader from "@/components/ClientPreloader/Preloader";
import SignInContent from "@/components/SignPage";
export default function SignIn() {
  const router = useRouter();
  const { data: auth, isLoading: authLoading } = useGetAuth();
  const isAuthenticated = Boolean(auth && auth.status === 200);

  if (isAuthenticated) router.push("/products");
  if (authLoading) return <Preloader />;

  return (
    <section>
      <SignInContent />
    </section>
  );
}
