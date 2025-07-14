"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useListing from "./hooks/useListing";
import FullPageLoader from "@/components/loader/fullPageLoader";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ListingDetail() {
  const { data, isLoading } = useListing();
  const [imageIndex, setImageIndex] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (data?.images?.length) {
      setImage(data.images[imageIndex]);
    }
  }, [data, imageIndex]);

  const next = () => {
    if (data?.images && imageIndex < data.images.length - 1) {
      setImageIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (imageIndex > 0) {
      setImageIndex((prev) => prev - 1);
    }
  };

  if (isLoading || !data) return <FullPageLoader />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Button variant="outline" className="mb-4" onClick={() => history.back()}>
        ← Back
      </Button>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="relative col-span-2 w-full h-80">
          {image ? (
            <Image
              src={image}
              alt={data.title}
              fill
              className="rounded object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full md:px-4 h-full bg-muted flex items-center justify-center rounded">
              <span>No Image</span>
            </div>
          )}
          {data.images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={prev}
                disabled={imageIndex === 0}
              >
                <ArrowLeft />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={next}
                disabled={imageIndex === data.images.length - 1}
              >
                <ArrowRight />
              </Button>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-primary text-lg font-semibold mb-2">
            ₦{data.price.toLocaleString()} / year
          </p>
          <p className="text-muted-foreground mb-4">{data.location}</p>

          <Button className="mr-2">Contact Agent</Button>
          <Button variant="outline">Save</Button>
        </div>
      </div>

      <section className="mt-8">
        <h2 className="font-semibold text-lg mb-2">Description</h2>
        <p>{data.description}</p>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-lg mb-2">Details</h2>
        <ul className="list-disc list-inside text-muted-foreground">
          {data.category === "house" && (
            <>
              <li>Bedrooms: {"bedrooms" in data.metadata ? data.metadata.bedrooms || "N/A" : "N/A"}</li>
              <li>Bathrooms: {"bathrooms" in data.metadata ? data.metadata.bathrooms || "N/A" : "N/A"}</li>
              <li>Type: {"type" in data.metadata ? data.metadata.type || "N/A" : "N/A"}</li>
            </>
          )}
          {data.category === "product" && (
            <>
              <li>
                Product Type:{" "}
                {"productType" in data.metadata
                  ? (data.metadata as {productType: string}).productType || "N/A"
                  : "N/A"}
              </li>
              <li>Condition: {(data.metadata as {condition: string})?.condition || "N/A"}</li>
            </>
          )}
          {data.category === "service" && (
            <>
              <li>
                Service Type: 
                {"serviceType" in data.metadata
                  ? (data.metadata as {serviceType: string}).serviceType || "N/A"
                  : "N/A"}
              </li>
              <li>
                Availability: 
                {"availability" in data.metadata
                  ? (data.metadata as {availability: string}).availability || "N/A"
                  : "N/A"}
              </li>
            </>
          )}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold text-lg mb-2">Listed By</h2>
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12">
            <Image
              src="/user.jpg"
              alt="Listed By"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium">
              {typeof data.listedBy === "object"
                ? data.listedBy?.name || "Agent"
                : "Agent"}
            </p>
            <p className="text-sm text-muted-foreground">0812 345 6789</p>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-semibold text-lg mb-4">You might also like</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Replace with ListingCard if you have real data */}
          <div className="border p-4 rounded">
            <h4 className="font-bold">1 Bedroom Mini Flat</h4>
            <p>₦300,000/year – Ibadan</p>
          </div>
          <div className="border p-4 rounded">
            <h4 className="font-bold">Studio Apartment</h4>
            <p>₦250,000/year – Lagos</p>
          </div>
        </div>
      </section>
    </div>
  );
}
