"use client"
import { Listing, ListingCategory } from "@/types/Listing";
import ListingCard from "./ListingCard";

export default function ListingGrid({
  category,
  data,
}: {
  category: ListingCategory;
  data: Listing[];
}) {
  // ✅ Filter real data based on category
  const listings = data.filter((item) => item.category === category);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))
      ) : (
        <p className="text-muted-foreground text-center col-span-full">
          No listings found in this category.
        </p>
      )}
    </div>
  );
}
