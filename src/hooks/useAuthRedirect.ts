// hooks/useAuthRedirect.ts
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function useAuthRedirect() {
  const { isLoggedOut } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedOut) {
      sessionStorage.setItem("redirectAfterLogin", pathname);
      router.replace("/login");
    }
  }, [isLoggedOut, pathname, router]);
}
