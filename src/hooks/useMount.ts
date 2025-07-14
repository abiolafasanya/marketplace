"use client"
import { useEffect, useState } from "react";

/**
 * Returns `true` only after the component has mounted on the client.
 * Useful to avoid hydration mismatch when using browser-only APIs or dynamic values.
 */
export default function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
