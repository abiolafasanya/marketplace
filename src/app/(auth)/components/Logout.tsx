"use client";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();
  const redirect = () => {
    router.replace("/login");
  };

  return <Button onClick={() => logout(redirect)}>Logout</Button>;
}
