"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const { logout } = useAuthStore();

  return <Button onClick={logout}>Logout</Button>;
}
