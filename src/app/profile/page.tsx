// app/profile/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ErrorMessage from "@/components/errorMessage";
import useProfile from "./hooks/useProfile";
import UploadDropzone from "@/components/fileUpload";
import FullPageLoader from "@/components/loader/fullPageLoader";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
// import useAuthRedirect from "@/hooks/useAuthRedirect";

export default function ProfilePage() {
  const {
    isLoadingProfile,
    register,
    errors,
    files,
    formValues,
    handleSubmit,
    onProfileSubmit,
    registerPassword,
    passwordErrors,
    handlePasswordSubmit,
    onChangePassword,
    handleAvatarUpload,
  } = useProfile();

  
  const [editingAvatar, setEditingAvatar] = useState(false);

  if (isLoadingProfile) return <FullPageLoader />;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-4">
            <div className="space-y-2">
              {formValues?.avatar && !editingAvatar ? (
                <div className="relative w-20 h-20">
                  <Image
                    src={formValues.avatar}
                    alt="Profile Avatar"
                    fill
                    className="rounded-full object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => setEditingAvatar(true)}
                    className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <>
                  <Label>Avatar</Label>
                  <UploadDropzone
                    maxFiles={1}
                    files={files}
                    onChange={async (files) => {
                      await handleAvatarUpload(files);
                      setEditingAvatar(false);
                    }}
                  />
                  <ErrorMessage error={errors.avatar?.message} />
                </>
              )}
            </div>

            <div className="space-y-2">
              <Label>Name</Label>
              <Input {...register("name" as const)} />
              <ErrorMessage error={errors.name?.message} />
            </div>

            <div className="space-y-2">
              <Label>Phone</Label>
              <Input {...register("phone" as const)} />
              <ErrorMessage error={errors.phone?.message} />
            </div>

            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <form
            onSubmit={handlePasswordSubmit(onChangePassword)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input
                type="password"
                {...registerPassword("currentPassword" as const)}
              />
              <ErrorMessage error={passwordErrors.currentPassword?.message} />
            </div>

            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                {...registerPassword("newPassword" as const)}
              />
              <ErrorMessage error={passwordErrors.newPassword?.message} />
            </div>

            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                {...registerPassword("confirmPassword" as const)}
              />
              <ErrorMessage error={passwordErrors.confirmPassword?.message} />
            </div>

            <Button type="submit">Change Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
