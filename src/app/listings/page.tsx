"use client";

import { useState } from "react";
import ListingCardFilters from "./components/ListingFilters";
import ListingGrid from "./components/ListingGrid";
import { ListingCategory } from "@/types/Listing";
import { Button } from "@/components/ui/button";
import useListing from "./hooks/useListing";
import FullPageLoader from "@/components/loader/fullPageLoader";
import useMounted from "@/hooks/useMount";

export default function ListingsPage() {
  const { data, isLoading, filters,setFilters } = useListing();
  const [category, setCategory] = useState<ListingCategory>("house");
  const categories = ["house", "product", "service"] as ListingCategory[];
  const categoryIconType = {
    house: "🏠 Accommodation",
    product: "🛍️ Products",
    service: "🛠️ Services",
  };
  const mounted = useMounted();
  
  if (!mounted) return <FullPageLoader />;

  if (isLoading) {
    return <FullPageLoader />;
  }
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Explore Listings</h1>

      <div className="flex gap-2 mb-6">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setCategory(cat)}
            variant={category === cat ? "default" : "outline"}
          >
            {cat === "house"
              ? "🏠 Accommodation"
              : categoryIconType[cat] +
                " " +
                cat.charAt(0).toUpperCase() +
                cat.slice(1)}
          </Button>
        ))}
      </div>

      <ListingCardFilters category={category} filters={filters} setFilters={setFilters} />
      <ListingGrid data={data} category={category} />
    </div>
  );
}
