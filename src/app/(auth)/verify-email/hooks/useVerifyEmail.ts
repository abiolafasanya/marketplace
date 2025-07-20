"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import authApi from "@/api/AuthApi";

export default function useVerifyEmail() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [message, setMessage] = useState("");
  const router  = useRouter();

  const mutation = useMutation({
    mutationKey: ["verify-email", token, email],
    mutationFn: async (payload: { token: string; email: string }) =>
      await authApi.verifyEmail(payload),
    onError(error) {
      let msg = "Something went wrong";
      if (error instanceof AxiosError) {
        msg = error.response?.data?.message || error.message;
      }
      setMessage(msg);
      toast.error(msg);
    },
    onSuccess(data) {
      setMessage(data.message);
      toast.success(data.message);
      router.push("/login");
    }
  });

  useEffect(() => {
    if (token && email) {
      mutation.mutate({token, email}); // auto-verify on page load
    }
  }, [token, email]);

  const onVerify = () => {
    if (token && email) mutation.mutate({token, email});
  };

  return {
    isVerifying: mutation.isPending,
    message,
    onVerify,
  };
}
