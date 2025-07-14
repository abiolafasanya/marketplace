"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Category = "house" | "product" | "service";

export default function LandingFilters({
  onSearch,
}: {
  onSearch?: (filters: { category: Category; keyword: string }) => void;
}) {
  const [category, setCategory] = useState<Category>("house");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch?.({ category, keyword });
    console.log("Searching for", keyword, "in", category);
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button
          variant={category === "house" ? "default" : "outline"}
          onClick={() => setCategory("house")}
        >
          🏠 Accommodation
        </Button>
        <Button
          variant={category === "product" ? "default" : "outline"}
          onClick={() => setCategory("product")}
        >
          🛍️ Products
        </Button>
        <Button
          variant={category === "service" ? "default" : "outline"}
          onClick={() => setCategory("service")}
        >
          🛠️ Services
        </Button>
      </div>

      <div className="flex justify-center gap-2">
        <Input
          placeholder="What are you looking for?"
          className="w-full md:w-96"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
    </div>
  );
}
