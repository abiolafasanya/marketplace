"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import UserMenu from "./UserMenu";

export default function Header() {
  const { user } = useAuthStore();
  return (
    <header className="border-b bg-white px-6 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold text-primary">
        MarketPlaceX
      </Link>
      <nav className="hidden md:flex gap-4 items-center">
        <Link
          href="/listings"
          className="text-muted-foreground hover:text-primary"
        >
          Browse
        </Link>
        <Link
          href="/listings/add"
          className="text-muted-foreground hover:text-primary"
        >
          List Item
        </Link>
      </nav>
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <UserMenu />
        ) : (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
