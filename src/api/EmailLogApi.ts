import QueryBuilder from "@/lib/utils";
import { PaginatedResponse } from "@/types/global";
import axios, { AxiosResponse } from "axios";

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

class EmailApi {
  private readonly url: string;

  constructor() {
    this.url = "/api/v1/admin";
  }

  async emailLogs(
    params: Partial<EmailLogQuery> = {}
  ): Promise<PaginatedResponse<EmailLog>> {
    const query = new QueryBuilder(`${this.url}/email-logs`)
      .set("from", params.from)
      .set("to", params.to)
      .set("limit", params.limit)
      .set("page", params.page)
      .set("status", params.status)
      .set("type", params.type)
      .set("user", params.user)
      .build();

    const response: AxiosResponse<PaginatedResponse<EmailLog>> =
      await axios.get(query);
    return response.data;
  }
}

// Export a singleton instance
const EmailApiInstance = new EmailApi();
export default EmailApiInstance;
