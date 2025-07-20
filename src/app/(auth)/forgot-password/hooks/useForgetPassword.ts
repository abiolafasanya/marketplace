"use client";
import authApi from "@/api/AuthApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ForgotPasswordInput, forgotPasswordSchema } from "../../schema/auth";

export default function useForgetPassword() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

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
      reset({});
      toast.success(data.message);
    },
  });

  const onSubmit = async ({ email }: ForgotPasswordInput) => {
    await mutation.mutateAsync(email);
  };

  return {
    isSubmitting: mutation.isPending,
    errors,
    onSubmit,
    handleSubmit,
    register,
  };
}
