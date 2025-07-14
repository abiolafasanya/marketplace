"use client";
import listingApiInstance from "@/api/ListingApi";
import { ListingFilters } from "@/types/Listing";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useListing() {
  const [filters, setFilters] = useState<ListingFilters>({} as ListingFilters);
  const listingQuery = useQuery({
    queryKey: ["Listings", filters],
    queryFn: () => listingApiInstance.fetchListings(filters),
  });

  return {
    data: listingQuery.data?.data || [],
    isLoading: listingQuery.isLoading,
    filters, setFilters,
  };
}
