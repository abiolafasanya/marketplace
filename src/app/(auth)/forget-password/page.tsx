"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useForgetPassword from "./hooks/useForgetPassword";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const { email, isSubmitting, onSubmit, setEmail } = useForgetPassword();

  return (
    <div className="bg-background max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Forgot Password</h2>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>
    </div>
  );
}
