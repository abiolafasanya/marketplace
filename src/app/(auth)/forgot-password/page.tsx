"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForgetPassword from "./hooks/useForgetPassword";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/errorMessage";

export default function ForgotPasswordPage() {
  const { isSubmitting, onSubmit, errors,handleSubmit,register } = useForgetPassword();

  return (
    <section className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-background p-6 rounded shadow-md w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          <ErrorMessage error={errors.email?.message ||""} />
        </div>
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </section>
  );
}
