"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authApi from "@/api/AuthApi";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { RegisterInput, registerSchema } from "../../schema/auth";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useRegister = () => {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { login } = useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterInput) => authApi.register(data),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.response?.data || error.message
        );
      }
    },
    onSuccess(data) {
      login(data.user);
      toast.success("Registration Successful");
      router.push("/");
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await mutation.mutateAsync(data);
  });

  return { form, handleSubmit };
};
