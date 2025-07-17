"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useResetPassword from "./hooks/useResetPassword";
import { Label } from "@/components/ui/label";

export default function ResetPasswordContent() {
  const { password, isSubmitting, onSubmit, setPassword } = useResetPassword();

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      <div className="space-y-2">
        <Label>New Password</Label>
        <Input
          type="password"
          required
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </div>
  );
}
