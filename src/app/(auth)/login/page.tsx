"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "./hooks/useLogin";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const { form, isSubmitting, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
            className="mb-2"
          />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Password"
            {...form.register("password")}
            className="mb-4"
          />
        </div>
        <Button disabled={isSubmitting} type="submit" className="w-full">
          Login
        </Button>

        <div className="text-sm text-center mt-4">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary underline">
              Register
            </Link>
          </p>
          <p className="mt-1">
            <Link
              href="/forgot-password"
              className="text-muted-foreground underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
