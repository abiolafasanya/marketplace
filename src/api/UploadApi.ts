import QueryBuilder from "@/lib/utils";
import axios, { AxiosResponse } from "axios";

export interface UploadResponse {
  status: boolean;
  message: string;
  urls: string[];
}

class UploadApi {
  private readonly url: string;

  constructor() {
    this.url = "/api/v1";
  }

  
  async upload(payload: FormData): Promise<UploadResponse> {
    const query = new QueryBuilder(`${this.url}/upload`).build();

    const response: AxiosResponse<UploadResponse> = await axios.post(query, payload);
    return response.data;
  }
  
  async uploads(payload: FormData): Promise<UploadResponse> {
    const query = new QueryBuilder(`${this.url}/uploads`).build();

    const response: AxiosResponse<UploadResponse> = await axios.post(query, payload);
    return response.data;
  }
}

// Export a singleton instance
const UploadApiInstance = new UploadApi();
export default UploadApiInstance;
