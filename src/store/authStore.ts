// store/authStore.ts
import { create } from "zustand";
import Cookies from "js-cookie";
import { persist } from "zustand/middleware";
import authApi, { AuthResponse } from "@/api/AuthApi";

interface AuthState {
  user: AuthResponse["user"] | null;
  token: string | null;
  isLoggedOut: boolean;
  login: (data: AuthResponse["user"]) => void;
  logout: (redirect?: () => void) => void;
  setIsLoggedOut: (val: boolean) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: Cookies.get("token") || null,
      isLoggedOut: true,

      login: (user) => set({ user }),
      logout: async(redirect: () => void = () =>{}) => {
        Cookies.remove("token");
        set({ user: null });
        set({isLoggedOut: true})
        await authApi.logout();
        redirect()
      },
      setIsLoggedOut: (val) => set({ isLoggedOut: val }),
      setToken: (token: string) => {
        Cookies.set("token", token);
        set({ token });
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isLoggedOut: state.isLoggedOut,
      }),
    }
  )
);
