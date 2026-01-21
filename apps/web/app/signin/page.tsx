"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { signIn } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  const [usePassword, setUsePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (usePassword) {
        await signIn.email({
            email,
            password,
            callbackURL: "/dashboard",
            fetchOptions: {
                onError: (ctx) => {
                    alert(ctx.error.message);
                    setLoading(false);
                }
            }
        });
    } else {
        await signIn.magicLink({
            email,
            callbackURL: "/dashboard",
            fetchOptions: {
                onSuccess: () => {
                    alert("Magic link sent! Check your email.");
                    setLoading(false);
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                    setLoading(false);
                }
            }
        });
    }
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

        {usePassword && (
            <div className="mt-2">
                <label className="auth-label" htmlFor="password">Password</label>
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
        )}

        <div className="mt-4">
            <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : (usePassword ? "Sign in" : "Send me a magic link")}
            </button>
        </div>

        <div className="mt-2 mb-6 text-center">
            <button 
                type="button"
                onClick={() => setUsePassword(!usePassword)}
                className="auth-btn-tertiary underline underline-offset-4 decoration-transparent hover:decoration-[#727DA1]"
            >
                {usePassword ? "Sign in using magic link" : "Sign in using password"}
            </button>
        </div>

        {/* Divider */}
        <div className="flex items-center">
            <div className="grow border-b border-[#727DA1]/20"></div>
            <div className="mx-6 text-[#727DA1] text-sm">or</div>
            <div className="grow border-b border-[#727DA1]/20"></div>
        </div>

        {/* SSO Button */}
        <button type="button" className="mt-1 auth-btn-secondary">
            Single Sign-On (SSO)
        </button>
      </form>
    </AuthLayout>
  );
}