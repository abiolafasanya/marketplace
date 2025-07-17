import authApi from "@/api/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ResetPasswordInput, resetPasswordSchema } from "../../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useResetPassword() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email")!;
  const token = searchParams.get("token")!;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: (payload: { email: string; token: string; password: string }) =>
      authApi.resetPassword(payload),
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

  const onSubmit = async ({ password }: ResetPasswordInput) => {
    await mutation.mutateAsync({ password, email, token });
  };

  return {
    isSubmitting: mutation.isPending,
    errors,
    handleSubmit,
    register,
    onSubmit,
  };
}
