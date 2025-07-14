export interface HouseMetadata {
  bedrooms?: number;
  bathrooms?: number;
  type?: "rent" | "sale";
}

export interface ProductMetadata {
  productType?: string;
  condition?: "new" | "used";
}

export interface ServiceMetadata {
  serviceType?: string;
  availability?: "weekdays" | "weekends";
}

export type ListingCategory = "house" | "product" | "service";

export interface Listing {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[]; // Cloudinary URL or local fallback
  category: ListingCategory;
  listedBy?: {
    name: string;
    phone?: string;
    _id: string;
  };
  metadata: HouseMetadata | ProductMetadata | ServiceMetadata;
}

export interface ListingFilters {
  category: ListingCategory;
  location?: string;
  minPrice?: number;
  maxPrice?: number;

  // House-specific
  bedrooms?: number;
  type?: "rent" | "sale";

  // Product-specific
  productType?: string;
  condition?: "new" | "used";

  // Service-specific
  serviceType?: string;
  availability?: "weekdays" | "weekends";
}

export interface ListingsResponse {
  listings: Listing[];
  total: number;
  page: number;
  pageSize: number;
}
