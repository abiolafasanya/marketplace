import { UpdateStoreSchema } from "@/app/store/schema/store";
import QueryBuilder from "@/lib/utils";
import { ApiResponse } from "@/types/global";
import axios, { AxiosResponse } from "axios";
import { User } from "./AuthApi";

export interface Store {
  name: string;
  description: string;
  phone: string;
  logo: string;
  banner: string;
  address: string;
  owner: User;
  slug: string;
}

class StoreApi {
  private readonly url: string;

  constructor() {
    this.url = "/api/v1/store";
  }

  async getStore(): Promise<ApiResponse<Store>> {
    const query = new QueryBuilder(`${this.url}/`).build();

    const response: AxiosResponse<ApiResponse<Store>> = await axios.get(query);
    return response.data;
  }

  async getPublicStore(slug: string): Promise<ApiResponse<Store>> {
    const query = new QueryBuilder(`${this.url}/${slug}`).build();

    const response: AxiosResponse<ApiResponse<Store>> = await axios.get(query);
    return response.data;
  }
  async updateStore(payload: UpdateStoreSchema): Promise<ApiResponse<unknown>> {
    const query = new QueryBuilder(`${this.url}/`).build();

    const response: AxiosResponse<ApiResponse<unknown>> = await axios.put(
      query,
      payload
    );
    return response.data;
  }
  // async getPublicStore,
}

// Export a singleton instance
const StoreApiInstance = new StoreApi();
export default StoreApiInstance;
