import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddListing, addListingSchema } from "../schema/addListing";
import { useMutation } from "@tanstack/react-query";
import listingApi from "@/api/ListingApi";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UploadApiInstance from "@/api/UploadApi";

export default function useAddListing() {
  const router = useRouter();
  const [category, setCategory] = useState<
    "house" | "product" | "service" | null
  >(null);
  const [files, setFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addListingSchema),

    defaultValues: {
      metadata: {},
    },
  });

  const mutation = useMutation({
    mutationKey: ["addListing"],
    mutationFn: (data: AddListing) => listingApi.create(data),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.response?.data || error.message
        );
      }
    },
    onSuccess(data) {
      reset();
      setFiles([]);
      toast.success(data.message);
      router.push("/listings");
    },
  });

  const uploadMutation = useMutation({
    mutationKey: ["uploadFiles"],
    mutationFn: (formData: FormData) => UploadApiInstance.uploads(formData),
    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.response?.data || error.message
        );
      }
    },
    onSuccess() {
      toast.success("File Uploaded");
    },
  });

  const onSubmit = async (values: AddListing) => {
    console.log("📤 Listing submitted:", values);
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("images", file);
      });
      const images = await uploadMutation.mutateAsync(formData);
      values.images = images.urls;
    }
    await mutation.mutateAsync(values);
    // TODO: Send to API endpoint
  };

  const handleCategoryChange = (value: "house" | "product" | "service") => {
    setValue("category", value);
    setCategory(value);
    clearErrors("category");
  };

  const handleFileUpload = async (files: File[]) => {
    setFiles(files);
  };
  return {
    errors,
    category,
    files,
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
    onSubmit,
    handleCategoryChange,
    handleFileUpload,
  };
}
