"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useDebouncedCallback } from "@/hooks/useDebounceCallback";
import { ListingCategory, ListingFilters } from "@/types/Listing";
import { useEffect, SetStateAction, Dispatch, useRef } from "react";

interface Props {
  category: ListingCategory;
  filters: ListingFilters;
  setFilters: Dispatch<SetStateAction<ListingFilters>>;
}

export default function ListingCardFilters({ category, filters,setFilters }: Props) {

const searchRef = useRef<HTMLInputElement>(null)

   const debouncedSetFilters = useDebouncedCallback(
     (...args: unknown[]) => {
       const [key, value] = args as [keyof ListingFilters, string | number];
       setFilters((prev) => ({
         ...prev,
         [key]: value,
       }));
     },
     500 // milliseconds
   );

   const handleChange = (key: keyof ListingFilters, value: string | number) => {
     if (value !== undefined && value !== null) {
       debouncedSetFilters(key, value);
     }
   };

  useEffect(() => {
    console.log("Current Filters:", filters);
    // TODO: You can pass this filters object to ListingGrid or search logic
  }, [filters]);

  return (
    <div className="mb-8 bg-gray-50 border rounded p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Shared filters */}
        <Input
          ref={searchRef}
          placeholder="Search by location..."
          onChange={(e) => handleChange("location", e.target.value)}
          defaultValue={filters.location}
        />
        <Input
          placeholder="Minimum Price"
          type="number"
          onChange={(e) => handleChange("minPrice", Number(e.target.value))}
          defaultValue={filters.minPrice}
        />
        <Input
          placeholder="Maximum Price"
          type="number"
          onChange={(e) => handleChange("maxPrice", Number(e.target.value))}
          defaultValue={filters.maxPrice}
        />

        {/* House filters */}
        {category === "house" && (
          <>
            <Input
              placeholder="Bedrooms"
              type="number"
              onChange={(e) => handleChange("bedrooms", Number(e.target.value))}
              defaultValue={filters.bedrooms}
            />
            <Select
              onValueChange={(val) =>
                handleChange("type", val as "rent" | "sale")
              }
              value={filters.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rent or Sale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}

        {/* Product filters */}
        {category === "product" && (
          <>
            <Input
              placeholder="Product Type"
              onChange={(e) => handleChange("productType", e.target.value)}
              defaultValue={filters.productType}
            />
            <Select
              onValueChange={(val) =>
                handleChange("condition", val as "new" | "used")
              }
              defaultValue={filters.condition}
            >
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}

        {/* Service filters */}
        {category === "service" && (
          <>
            <Input
              placeholder="Service Type"
              onChange={(e) => handleChange("serviceType", e.target.value)}
              defaultValue={filters.serviceType}
            />
            <Select
              onValueChange={(val) =>
                handleChange("availability", val as "weekdays" | "weekends")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekdays">Weekdays</SelectItem>
                <SelectItem value="weekends">Weekends</SelectItem>
              </SelectContent>
            </Select>
          </>
        )}
      </div>
    </div>
  );
}
