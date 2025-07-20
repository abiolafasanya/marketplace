"use client";

import { Button } from "@/components/ui/button";
import useVerifyEmail from "./hooks/useVerifyEmail";

export default function VerifyEmailPage() {
  const { isVerifying, message, onVerify } = useVerifyEmail();

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-background p-6 rounded shadow-md w-full max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold">Verify Email</h2>
        <p className="text-muted-foreground">
          We are verifying your email. This may take a moment...
        </p>
        <Button disabled={isVerifying} onClick={onVerify}>
          {isVerifying ? "Verifying..." : "Retry Verification"}
        </Button>
        {message && (
          <p className="text-sm text-muted-foreground mt-2">{message}</p>
        )}
      </div>
    </section>
  );
}
