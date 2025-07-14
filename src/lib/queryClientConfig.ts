import { QueryClient } from "@tanstack/react-query";

const queryClientConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClientConfig;
