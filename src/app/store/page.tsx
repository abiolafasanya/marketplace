"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import UploadDropzone from "@/components/fileUpload";
import ErrorMessage from "@/components/errorMessage";
import useStore from "./hooks/useStore";
import FullPageLoader from "@/components/loader/fullPageLoader";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";

export default function StoreProfilePage() {
  const {
    errors,
    formValues,
    isLoading,
    store,
    bannerFile,
    logoFile,
    isEditingBanner,
    isEditingLogo,
    setIsEditingBanner,
    setIsEditingLogo,
    onChangeAddress,
    register,
    handleSubmit,
    onSubmit,
    handleImageUpload,
  } = useStore();

  if (isLoading) return <FullPageLoader />;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-4">My Store</h1>
       {store?.slug && <Link href={`/store/${store!.slug!}`}>
          <Button variant={"secondary"}>View Store</Button>
        </Link>}
      </div>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input {...register("name")} />
              <ErrorMessage error={errors.name?.message} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input {...register("description")} />
              <ErrorMessage error={errors.description?.message} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Textarea
                // {...register("address")}
                onChange={(e) => onChangeAddress(e.currentTarget.value)}
                defaultValue={formValues?.address}
                placeholder="Address"
              ></Textarea>
              <ErrorMessage error={errors.address?.message} />
            </div>
            <div className="space-y-2">
              <Label>Banner</Label>
              {formValues?.banner && !bannerFile && !isEditingBanner ? (
                <div className="relative w-full h-40 rounded overflow-hidden border">
                  <Image
                    src={formValues.banner}
                    alt="Store Banner"
                    fill
                    className="object-cover rounded"
                    sizes="100vw"
                  />
                  <Button
                    variant="outline"
                    className="absolute top-2 right-2 text-xs"
                    onClick={() => setIsEditingBanner(true)}
                    type="button"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <>
                  <UploadDropzone
                    files={bannerFile ? [bannerFile] : []}
                    onChange={(files) => {
                      handleImageUpload(files[0], "banner");
                      setIsEditingBanner(false); // hide uploader after change
                    }}
                    maxFiles={1}
                  />
                  <ErrorMessage error={errors.banner?.message} />
                </>
              )}
            </div>

            <div className="space-y-2">
              <Label>Logo</Label>
              {formValues.logo && !logoFile && !isEditingLogo ? (
                <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                  <Image
                    src={formValues.logo}
                    alt="Store Logo"
                    fill
                    className="object-cover rounded-full"
                    sizes="96px"
                  />
                  <Button
                    variant="outline"
                    className="absolute top-1 right-1 text-xs"
                    onClick={() => setIsEditingLogo(true)}
                    type="button"
                  >
                    Change
                  </Button>
                </div>
              ) : (
                <>
                  <UploadDropzone
                    files={logoFile ? [logoFile] : []}
                    onChange={(files) => {
                      handleImageUpload(files[0], "logo");
                      setIsEditingLogo(false);
                    }}
                    maxFiles={1}
                  />
                  <ErrorMessage error={errors.logo?.message} />
                </>
              )}
            </div>

            <Button type="submit">Update Store</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
