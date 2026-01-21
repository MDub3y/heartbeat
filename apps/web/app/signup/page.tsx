"use client";

import Link from "next/link";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { signIn } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await signIn.magicLink({
        email,
        callbackURL: "/dashboard",
        name: "New User", // You can add a name field to the form
        fetchOptions: {
            onSuccess: () => {
                alert("Magic link sent! Check your inbox to complete signup.");
                setLoading(false);
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
      title="Sign up for free"
      subtitle={<>Already have an account? <Link href="/signin" className="text-[#5B63D3] hover:text-[#7C87F7] transition-colors">Sign in</Link>.</>}
    >
      <form onSubmit={handleSignUp} className="flex flex-col gap-6">
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

        <div className="mt-2">
            <button type="submit" className="auth-btn-primary" disabled={loading}>
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send me a magic link"}
            </button>
        </div>
      </form>
      
      {/* ... Disclaimer ... */}
      <p className="mt-6 text-center text-[13px] text-[#555E75]">
          By signing up, you agree to our{" "}
          <Link href="#" className="underline hover:text-[#9CA3AF]">Terms</Link>
          {" "}and{" "}
          <Link href="#" className="underline hover:text-[#9CA3AF]">Privacy Policy</Link>.
      </p>
    </AuthLayout>
  );
}