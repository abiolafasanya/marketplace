import { AddListing } from "@/app/listings/add/schema/addListing";
import QueryBuilder from "@/lib/utils";
import { PaginatedResponse } from "@/types/global";
import axios, { AxiosResponse } from "axios";
import { Listing, ListingFilters } from "@/types/Listing";

// Interfaces for request parameters

export interface GetBranchParams {
  page: number;
  pageSize: number;
}

interface ApiResponse<T = unknown> {
  status: boolean;
  message: string;
  data: T;
}

class ListingApi {
  private readonly url: string;

  constructor() {
    this.url = "/api/v1/listing";
  }

  private buildListingQuery = (filters: Partial<ListingFilters>) => {
    const query = new QueryBuilder(`${this.url}s/`);

    if (filters.category) query.set("category", filters.category);
    if (filters.location) query.set("location", filters.location);
    if (filters.minPrice) query.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) query.set("maxPrice", filters.maxPrice.toString());

    // House-specific
    if (filters.bedrooms) query.set("bedrooms", filters.bedrooms.toString());
    if (filters.type) query.set("type", filters.type);

    // Product-specific
    if (filters.productType) query.set("productType", filters.productType);
    if (filters.condition) query.set("condition", filters.condition);

    // Service-specific
    if (filters.serviceType) query.set("serviceType", filters.serviceType);
    if (filters.availability) query.set("availability", filters.availability);

    return query.build();
  };

  async fetchListings(
    params: Partial<ListingFilters> = {}
  ): Promise<PaginatedResponse<Listing>> {
    const query = this.buildListingQuery(params);

    const response: AxiosResponse<PaginatedResponse<Listing>> = await axios.get(
      query
    );
    return response.data;
  }

  async findOne(id: string): Promise<ApiResponse<Listing>> {
    const query = new QueryBuilder(`${this.url}/${id}`).build();

    const response: AxiosResponse<ApiResponse<Listing>> = await axios.get(
      query
    );
    return response.data;
  }

  async create(payload: AddListing): Promise<ApiResponse> {
    const query = new QueryBuilder(`${this.url}/`).build();

    const response: AxiosResponse<ApiResponse> = await axios.post(
      query,
      payload
    );
    return response.data;
  }
}

// Export a singleton instance
const listingApiInstance = new ListingApi();
export default listingApiInstance;
