import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "../../schema/auth";
import authApi from "@/api/AuthApi";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

export const useLogin = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { isLoggedOut, login, setIsLoggedOut } = useAuthStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["loginMutation"],
    mutationFn: (payload: LoginInput) => authApi.login(payload),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    onSuccess() {
      setIsLoggedOut(false);
      toast.success("User LoggedIn");
      form.reset();
    },
  });

  useEffect(() => {
    if (!isLoggedOut) {
      console.log("Logout", isLoggedOut)
      router.push("/");
    }
  }, [isLoggedOut, router]);

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await mutation.mutateAsync(data);

    login(response.user); // sets token & other data
    axios.defaults.headers.common["Authorization"] = response.token;

    const redirectTo = sessionStorage.getItem("redirectAfterLogin");
    sessionStorage.removeItem("redirectAfterLogin");

    if (redirectTo) {
      router.replace(redirectTo);
    } else {
      router.push("/");
    }
  });

  return { form, isSubmitting: mutation.isPending, handleSubmit };
};
