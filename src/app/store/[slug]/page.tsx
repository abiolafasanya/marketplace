"use client";

import { useParams } from "next/navigation";
import usePublicStore from "./hooks/usePublicStore";
import FullPageLoader from "@/components/loader/fullPageLoader";
import Image from "next/image";
import ListingCard from "@/app/listings/components/ListingCard";

export default function StorePublicPage() {
  const { slug } = useParams<{ slug: string }>();
  const { store, listings, isLoading } = usePublicStore(slug);

  if (isLoading || !store) return <FullPageLoader />;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Banner */}
      {store!.banner && (
        <div className="w-full h-48 relative rounded-md overflow-hidden">
          <Image
            src={store.banner!}
            alt="Store Banner"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Logo & Basic Info */}
      <div className="flex items-center gap-4">
        {store!.logo && (
          <div className="relative w-20 h-20 rounded-full overflow-hidden border">
            <Image src={store.logo} alt="Logo" fill className="object-cover" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{store.name}</h1>
          <p className="text-muted-foreground">{store.description}</p>
          <p className="text-sm text-muted-foreground mt-1">{store.address}</p>
        </div>
      </div>

      {/* Owner Info */}
      <div className="border p-4 rounded shadow-sm">
        <h2 className="font-semibold mb-2">Contact Store Owner</h2>
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border">
            <Image
              src={store.owner?.avatar || "/user.jpg"}
              alt={store.owner?.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{store.owner?.name}</p>
            <p className="text-sm text-muted-foreground">
              {store.owner?.phone}
            </p>
          </div>
        </div>
      </div>

      {/* Listings (coming soon) */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Listings</h2>
        {listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No listings available yet.</p>
        )}
      </section>
    </div>
  );
}
