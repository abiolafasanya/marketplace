"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import UploadApiInstance from "@/api/UploadApi";
import storeApi from "@/api/StoreApi";
import { updateStoreSchema, UpdateStoreSchema } from "../schema/store";
import { useEffect, useState } from "react";

export default function useStore() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<UpdateStoreSchema>({
    resolver: zodResolver(updateStoreSchema),
  });

  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [isEditingLogo, setIsEditingLogo] = useState(false);

  const storeQuery = useQuery({
    queryKey: ["store"],
    queryFn: () => storeApi.getStore(),
  });

  const storeMutation = useMutation({
    mutationKey: ["updateStore"],
    mutationFn: (payload: UpdateStoreSchema) => storeApi.updateStore(payload),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    onSuccess() {
      toast.success("Store updated successfully");
    },
  });

  const uploadMutation = useMutation({
    mutationKey: ["uploadStoreImage"],
    mutationFn: (formData: FormData) => UploadApiInstance.uploads(formData),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || error.message);
      }
    },
    onSuccess() {
      toast.success("Image uploaded successfully");
    },
  });

  useEffect(() => {
    const store = storeQuery.data?.data;
    reset({
      banner: store?.banner,
      description: store?.description,
      logo: store?.logo,
      name: store?.name,
      address: store?.address,
    });
  }, [reset, storeQuery.data]);

  const onChangeAddress = (value: string) => {
    setValue("address", value);
    clearErrors("address");
  };

  const handleImageUpload = (file: File | null, type: "banner" | "logo") => {
    if (type === "banner") {
      setBannerFile(file ?? null);
    } else {
      setLogoFile(file ?? null);
    }

    if (file) {
      const formData = new FormData();
      formData.append("images", file);
      uploadMutation.mutateAsync(formData).then((data) => {
        setValue(type, data.urls[0]);
      });
    }
  };

  const onSubmit = async (values: UpdateStoreSchema) => {
    await storeMutation.mutateAsync(values);
  };

  return {
    store: storeQuery.data?.data,
    formValues: getValues(),
    isLoading: storeQuery.isLoading,
    bannerFile,
    logoFile,
    isEditingBanner,
    isEditingLogo,
    setIsEditingBanner,
    setIsEditingLogo,
    onChangeAddress,
    register,
    handleSubmit,
    errors,
    watch,
    onSubmit,
    handleImageUpload,
  };
}
