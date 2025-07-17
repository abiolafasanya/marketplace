import LandingFilters from "./components/LandingFilters";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <main className="px-6 py-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">Find What You Need – Fast</h2>
        <p className="text-muted-foreground mb-6">
          Search houses, shop for products, or hire trusted service providers.
        </p>

        <LandingFilters />

        <section className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Popular Listings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border p-4 rounded">
              <h4 className="font-bold">2 Bedroom Apartment</h4>
              <p>₦450,000/year – Lagos</p>
            </div>
            <div className="border p-4 rounded">
              <h4 className="font-bold">Men’s Sneakers</h4>
              <p>₦15,000 – Abuja</p>
            </div>
            <div className="border p-4 rounded">
              <h4 className="font-bold">Electrician for hire</h4>
              <p>₦5,000/session – Ibadan</p>
            </div>
          </div>
        </section>

        <section className="mt-16 bg-background p-6 rounded shadow">
          <h3 className="text-xl font-bold mb-4">How It Works</h3>
          <ol className="space-y-2 text-left">
            <li>1️⃣ Search for what you need</li>
            <li>2️⃣ Contact the vendor or provider</li>
            <li>3️⃣ Make payment/delivery and enjoy!</li>
          </ol>
        </section>

        <div className="mt-12">
          <Button className="text-lg px-6 py-3">Become a Seller / Agent</Button>
        </div>
      </main>
    </div>
  );
}
