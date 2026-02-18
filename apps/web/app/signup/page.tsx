"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { signUp } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signUp.email({
        email,
        password,
        name,
        callbackURL: "/dashboard",
        fetchOptions: {
            onSuccess: () => {
                // Better Auth logs you in automatically after signup
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
      title="Create your account"
      subtitle={<>Already have an account? <Link href="/signin" className="text-[#5B63D3] hover:text-[#7C87F7] transition-colors">Sign in</Link>.</>}
    >
      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        
        {/* Name Field */}
        <div>
            <label className="auth-label" htmlFor="name">Full Name</label>
            <input 
                id="name"
                type="text" 
                placeholder="John Doe" 
                className="auth-form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
            />
        </div>

        {/* Email Field */}
        <div>
            <label className="auth-label" htmlFor="email">E-mail</label>
            <input 
                id="email"
                type="email" 
                placeholder="Your work e-mail" 
                className="auth-form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
            />
        </div>

        {/* Password Field */}
        <div>
            <label className="auth-label" htmlFor="password">Password</label>
            <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                className="auth-form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                minLength={8}
            />
        </div>

        <div className="mt-2">
            <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Sign up"}
            </button>
        </div>
      </form>
      
      <p className="mt-6 text-center text-[13px] text-[#555E75]">
          By signing up, you agree to our{" "}
          <Link href="#" className="underline hover:text-[#9CA3AF]">Terms</Link>
          {" "}and{" "}
          <Link href="#" className="underline hover:text-[#9CA3AF]">Privacy Policy</Link>.
      </p>
    </AuthLayout>
  );
}