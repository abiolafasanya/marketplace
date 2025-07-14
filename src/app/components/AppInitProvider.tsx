"use client";

import axiosConfig from "@/lib/axiosConfig";
import { useEffect } from "react";

export default function AppInitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    axiosConfig();
  }, []);

  return <>{children}</>;
}
