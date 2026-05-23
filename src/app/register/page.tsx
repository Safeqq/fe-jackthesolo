"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRegister } from "@/lib/hooks";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RegisterForm {
  email: string;
  name: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    registerMutation.mutate(data, {
      onSuccess: () => router.push("/login"),
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Register</h1>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            Create a new account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm font-mono outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-xs text-destructive font-mono">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Username</label>
            <input
              type="text"
              {...register("name", {
                required: "Username is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
              className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm font-mono outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
              placeholder="username"
            />
            {errors.name && (
              <p className="text-xs text-destructive font-mono">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium font-mono">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="w-full rounded-lg border border-border/50 bg-background px-4 py-2.5 text-sm font-mono outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-xs text-destructive font-mono">
                {errors.password.message}
              </p>
            )}
          </div>

          {registerMutation.isError && (
            <p className="text-sm text-destructive font-mono">
              {registerMutation.error.message}
            </p>
          )}

          {registerMutation.isSuccess && (
            <p className="text-sm text-green-500 font-mono">
              Registration successful! Redirecting to login...
            </p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className={cn(
              buttonVariants({ className: "w-full font-mono rounded-full h-11" })
            )}
          >
            {registerMutation.isPending ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground font-mono">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
