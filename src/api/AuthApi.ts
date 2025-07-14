import { LoginInput, RegisterInput } from "@/app/(auth)/schema/auth";
import {
  ChangePasswordSchema,
  UpdateProfileSchema,
} from "@/app/profile/schema/profile";
import axios, { AxiosResponse } from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  avatar: string;
}
export interface AuthResponse {
  token: string;
  user: User;
}

class AuthApi {
  private readonly url = "/api/v1/auth";

  async login(payload: LoginInput): Promise<AuthResponse> {
    const { data }: AxiosResponse<{ data: AuthResponse }> = await axios.post(
      `${this.url}/`,
      payload
    );
    return data.data;
  }

  async register(payload: RegisterInput): Promise<AuthResponse> {
    const { data }: AxiosResponse<{ data: AuthResponse }> = await axios.post(
      `${this.url}/register`,
      payload
    );
    return data.data;
  }
  async updateProfile(payload: UpdateProfileSchema): Promise<AuthResponse> {
    const { data }: AxiosResponse<{ data: AuthResponse }> = await axios.patch(
      `${this.url}/profile`,
      payload
    );
    return data.data;
  }
  async changePassword(payload: ChangePasswordSchema): Promise<AuthResponse> {
    const { data }: AxiosResponse<{ data: AuthResponse }> = await axios.post(
      `${this.url}/change-password`,
      payload
    );
    return data.data;
  }

  async getMe(): Promise<AuthResponse["user"]> {
    const { data }: AxiosResponse<{ data: AuthResponse["user"] }> =
      await axios.get(`${this.url}/me`);
    return data.data;
  }
}

const authApi = new AuthApi();
export default authApi;
