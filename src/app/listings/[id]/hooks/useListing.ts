"use client";
import listingApiInstance from "@/api/ListingApi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useListing() {
  const { id } = useParams();
  const listingQuery = useQuery({
    queryKey: ["Listing", id],
    queryFn: () => listingApiInstance.findOne(id as string),
  });

  console.log(listingQuery.data)

  return {
    data: listingQuery.data?.data,
    isLoading: listingQuery.isLoading,
  };
}
