"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import UploadApiInstance from "@/api/UploadApi";
import userApi from "@/api/AuthApi";
import {
  UpdateProfileSchema,
  updateProfileSchema,
  ChangePasswordSchema,
  changePasswordSchema,
} from "../schema/profile";
import authApi from "@/api/AuthApi";
import { useEffect, useState } from "react";

export default function useProfile() {
  const [files, setFile] = useState<File[]>([])

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => authApi.getMe(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      avatar: profileQuery.data?.avatar || "",
      name: profileQuery.data?.name || "",
      phone: profileQuery.data?.phone || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  const profileMutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (payload: UpdateProfileSchema) =>
      userApi.updateProfile(payload),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    onSuccess() {
      toast.success("Profile updated successfully");
      reset();
    },
  });

  const passwordMutation = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (payload: ChangePasswordSchema) =>
      userApi.changePassword(payload),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    onSuccess() {
      toast.success("Password changed successfully");
      resetPasswordForm();
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationKey: ["uploadAvatar"],
    mutationFn: (formData: FormData) => UploadApiInstance.uploads(formData),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    onSuccess(data) {
      toast.success("Avatar uploaded successfully");
      setValue("avatar", data.urls[0]);
    },
  });

  useEffect(() => {
    const profile = profileQuery.data;
    reset({
      avatar: profile?.avatar || "",
      name: profile?.name || "",
      phone: profile?.phone || "",
    });
  }, [profileQuery.data, reset]);

  const onProfileSubmit = async (values: UpdateProfileSchema) => {
    await profileMutation.mutateAsync(values);
  };

  const onChangePassword = async (values: ChangePasswordSchema) => {
    await passwordMutation.mutateAsync(values);
  };

  const handleAvatarUpload = async (files: File[]) => {
    const formData = new FormData();
    setFile(files)
    formData.append("images", files[0]);
   const res = await uploadAvatarMutation.mutateAsync(formData);
    setValue("avatar", res.urls[0])
  };

  return {
    errors,
    files,
    profile: profileQuery.data,
    formValues: getValues(),
    isLoadingProfile: profileQuery.isLoading,
    passwordErrors,
    register,
    handleSubmit,
    onProfileSubmit,
    registerPassword,
    handlePasswordSubmit,
    onChangePassword,
    handleAvatarUpload,
    watch,
  };
}
