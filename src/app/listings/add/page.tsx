// components/ListItemForm.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useAddListing from "./hooks/useAddListing";
import ErrorMessage from "@/components/errorMessage";
import UploadDropzone from "@/components/fileUpload";
import useMounted from "@/hooks/useMount";
import FullPageLoader from "@/components/loader/fullPageLoader";

export default function ListItemForm() {
  const {
    category,
    errors,
    files,
    handleFileUpload,
    handleCategoryChange,
    handleSubmit,
    onSubmit,
    register,
  } = useAddListing();

  const mounted = useMounted();

  if (!mounted) return <FullPageLoader />;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl w-full  mx-auto space-y-6 p-6 bg-white shadow rounded"
      >
        <h2 className="text-2xl font-semibold text-center">List Your Item</h2>
        <div className="space-y-2">
          <UploadDropzone files={files} onChange={handleFileUpload} />
        </div>
        <div className="space-y-2 w-full">
          <Label>Category</Label>
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="service">Service</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage error={errors.category?.message || ""} />
        </div>

        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            placeholder="E.g., 2 Bedroom Apartment"
            {...register("title")}
          />
          <ErrorMessage error={errors.title?.message || ""} />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Describe your listing..."
            {...register("description")}
          />
          <ErrorMessage error={errors.description?.message || ""} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Price (₦)</Label>
            <Input type="number" {...register("price")} />
            <ErrorMessage error={errors.price?.message || ""} />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              placeholder="E.g., Lagos, Nigeria"
              {...register("location")}
            />
            <ErrorMessage error={errors.location?.message || ""} />
          </div>
        </div>

        {category === "house" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Input type="number" {...register("metadata.bedrooms")} />
                <ErrorMessage
                  error={errors.metadata?.bedrooms?.message || ""}
                />
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Input type="number" {...register("metadata.bathrooms")} />
                <ErrorMessage
                  error={errors.metadata?.bathrooms?.message || ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Input
                placeholder="E.g., Rent or Sale"
                {...register("metadata.type")}
              />
            </div>
          </>
        )}

        {category === "product" && (
          <>
            <div className="space-y-2">
              <Label>Product Type</Label>
              <Input
                placeholder="E.g., Shoes, Bags"
                {...register("metadata.productType")}
              />
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Input
                placeholder="E.g., New, Used"
                {...register("metadata.condition")}
              />
            </div>
          </>
        )}

        {category === "service" && (
          <>
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Input
                placeholder="E.g., Plumbing, Painting"
                {...register("metadata.serviceType")}
              />
            </div>
            <div className="space-y-2">
              <Label>Availability</Label>
              <Input
                placeholder="E.g., Mon–Fri, 9am–5pm"
                {...register("metadata.availability")}
              />
            </div>
          </>
        )}

        <Button type="submit" className="w-full text-lg">
          📤 List My Item Now
        </Button>
      </form>
    </div>
  );
}
