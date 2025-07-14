import axios, { AxiosError, AxiosResponse } from "axios";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

// Type for the error response
interface ErrorResponse {
  response?: {
    status: number;
  };
}

const axiosConfig = async (): Promise<void> => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  axios.defaults.withCredentials = true;


  // ✅ Add request interceptor to dynamically inject token
  // axios.interceptors.request.use((config) => {
  //   const token = useAuthStore.getState().token;
  //   if (token) {
  //     config.headers["Authorization"] = `Bearer ${token}`;
  //   }
  //   return config;
  // });

  // ✅ Response interceptor remains the same
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ErrorResponse>) => {
      const isLoggedOut = useAuthStore.getState().isLoggedOut;

      if (error.response?.status === 401 && !isLoggedOut) {
        useAuthStore.getState().setIsLoggedOut(true);
        toast.error("Session expired");
        window.location.href = "/login";
        useAuthStore.getState().logout();
        return Promise.reject("Unauthorized");
      }

      return Promise.reject(error);
    }
  );
};


export default axiosConfig;
