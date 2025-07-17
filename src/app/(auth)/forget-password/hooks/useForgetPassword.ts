import authApi from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import  { useState } from "react";
import { toast } from "sonner";

export default function useForgetPassword() {
  const [email, setEmail] = useState("");

  const mutation = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: (email: string) => authApi.forgotPassword(email),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.response?.data || error.message
        );
      }
    },
    onSuccess(data) {
      toast.success(data.message);
    },
  });

  const onSubmit = async () => {
    await mutation.mutateAsync(email);
  };

  return {
    isSubmitting: mutation.isPending,
    email,
    onSubmit,
    setEmail,
  };
}
