import EmailApiInstance from "@/api/EmailLogApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface EmailLog {
  _id: string;
  to: string;
  type: string;
  subject: string;
  status: "sent" | "failed";
  createdAt: string;
}

export interface EmailLogQuery {
  page?: number;
  limit?: number;
  user?: string;
  type?: string;
  status?: string;
  from?: string;
  to?: string;
}

export default function useEmailLogs(initialQuery: EmailLogQuery = {}) {
  const [query, setQuery] = useState<EmailLogQuery>({
    page: 1,
    limit: 10,
    ...initialQuery,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["email-logs", query],
    queryFn: async () => EmailApiInstance.emailLogs(query),
  });

  const setPage = (page: number) => setQuery((prev) => ({ ...prev, page }));

  return {
    logs: (data?.data as EmailLog[]) || [],
    meta: data?.meta,
    isLoading,
    error,
    query,
    setQuery,
    setPage,
    refetch,
  };
}
