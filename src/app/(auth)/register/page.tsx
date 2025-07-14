"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegister } from "./hooks/useRegister";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const { form, handleSubmit } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="Full Name"
            {...form.register("name")}
            className="mb-2"
          />
        </div>
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
        <p className="text-xs text-muted-foreground mb-4 text-center">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <Button type="submit" className="w-full">
          Register
        </Button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
