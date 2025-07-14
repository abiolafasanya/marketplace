"use client"
import { useQuery } from "@tanstack/react-query";
import storeApi from "@/api/StoreApi";
import listingApiInstance from "@/api/ListingApi";

export default function usePublicStore(slug: string) {
   const storeQuery = useQuery({
    queryKey: ["public-store", slug],
    queryFn: () => storeApi.getPublicStore(slug),
    enabled: !!slug,
  });

   const listingQuery = useQuery({
    queryKey: ["public-listing", slug],
    queryFn: () => listingApiInstance.fetchListings(),
    enabled: !!slug,
  });

  return {
    store: storeQuery.data?.data,
    listings: listingQuery.data?.data || [],
    isListingLoading: listingQuery.isLoading,
    isLoading: storeQuery.isLoading,
  }
}
