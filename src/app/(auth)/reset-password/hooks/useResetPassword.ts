import authApi from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import  { useState } from "react";
import { toast } from "sonner";

export default function useResetPassword() {
   const searchParams = useSearchParams();
   const email = searchParams.get("email")!;
   const token = searchParams.get("token")!;
   const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (email: string) => authApi.resetPassword({email, token, password}),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.response?.data || error.message
        );
      }
    },
    onSuccess(data) {
      setPassword("")
      toast.success(data.message);
    },
  });

  const onSubmit = async () => {
    await mutation.mutateAsync(email);
  };

  return {
    isSubmitting: mutation.isPending,
    password,
    onSubmit,
    setPassword,
  };
}
