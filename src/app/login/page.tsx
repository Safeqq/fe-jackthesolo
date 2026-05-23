"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useLogin } from "@/lib/hooks";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LoginForm {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Login</h1>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm font-mono outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
              placeholder="your_username"
            />
            {errors.username && (
              <p className="text-xs text-destructive font-mono">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm font-mono outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-destructive font-mono">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginMutation.isError && (
            <p className="text-sm text-destructive font-mono">
              {loginMutation.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className={cn(
              buttonVariants({ className: "w-full font-mono rounded-full h-11" })
            )}
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-mono">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
