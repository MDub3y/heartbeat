"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { signIn } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
        fetchOptions: {
            onSuccess: () => {
                router.push("/dashboard");
            },
            onError: (ctx) => {
                alert(ctx.error.message);
                setLoading(false);
            }
        }
    });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={<>First time here? <Link href="/signup" className="text-[#5B63D3] hover:text-[#7C87F7] transition-colors">Sign up for free</Link>.</>}
    >
      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
        <div>
            <label className="auth-label" htmlFor="email">E-mail</label>
            <input 
                id="email"
                type="email" 
                placeholder="Your work e-mail" 
                className="auth-form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required 
            />
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="auth-label mb-0" htmlFor="password">Password</label>
                <Link href="#" className="text-xs text-[#727DA1] hover:text-white transition-colors">Forgot password?</Link>
            </div>
            <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className="auth-form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>

        <div className="mt-4">
            <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign in"}
            </button>
        </div>
      </form>
    </AuthLayout>
  );
}