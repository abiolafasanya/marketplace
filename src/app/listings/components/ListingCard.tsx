"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/types/Listing";


export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      <div className="relative w-full h-48">
        <Image
          src={listing?.images[0]}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
        />
      </div>
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{listing.title}</h3>
        <p className="text-primary font-bold text-sm">
          ₦{listing.price.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">{listing.location}</p>

        <div className="flex justify-between mt-4">
          <Link href={`/listings/${listing._id}`}>
            <Button size="sm">View</Button>
          </Link>
          <Button variant="outline" size="sm">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
