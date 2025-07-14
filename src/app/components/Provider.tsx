// components/Provider.tsx
"use client";

import queryClientConfig from "@/lib/queryClientConfig";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(queryClientConfig);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
