import { LoginInput, RegisterInput } from "@/app/(auth)/schema/auth";
import {
  ChangePasswordSchema,
  UpdateProfileSchema,
} from "@/app/profile/schema/profile";
import QueryBuilder from "@/lib/utils";
import { ApiResponse } from "@/types/global";
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

export interface ResetPassword {
  email: string;
  password: string;
  token: string;
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

  async verifyEmail(payload: {
    token: string;
    email: string;
  }): Promise<ApiResponse<string>> {
    const query = new QueryBuilder(`${this.url}/verify-email`)
      .set("token", payload.token)
      .set("email", payload.email)
      .build();

    const response: AxiosResponse<ApiResponse<string>> = await axios.get(query);
    return response.data;
  }

  async resetPassword(payload: ResetPassword): Promise<ApiResponse<string>> {
    const { data }: AxiosResponse<{ data: ApiResponse<string> }> =
      await axios.post(`${this.url}/reet-password`, payload);
    return data.data;
  }

  async forgotPassword(email: string): Promise<ApiResponse<string>> {
    const { data }: AxiosResponse<ApiResponse<string>> = await axios.post(
      `${this.url}/forgot-password`,
      { email }
    );
    return data;
  }

  async getMe(): Promise<AuthResponse["user"]> {
    const { data }: AxiosResponse<{ data: AuthResponse["user"] }> =
      await axios.get(`${this.url}/me`);
    return data.data;
  }
  async logout(): Promise<ApiResponse<string>> {
    const { data }: AxiosResponse<{ data: ApiResponse<string> }> =
      await axios.post(`${this.url}/logout`);
    return data.data;
  }
}

const authApi = new AuthApi();
export default authApi;
