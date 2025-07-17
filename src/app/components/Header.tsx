"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/themes";

export default function Header() {
  const { user} = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const initials = user?.name?.[0]?.toUpperCase() || "U";

  return (
    <header className="border-b bg-white dark:bg-black px-6 py-4 flex justify-between items-center shadow-sm relative">
      <Link href="/" className="text-xl font-bold text-primary">
        MarketPlaceX
      </Link>

      {/* Desktop Nav */}
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
        <ThemeToggle />
        {user ? (
          <UserMenu />
        ) : (
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden">
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Avatar className="cursor-pointer">
            {user?.avatar && <AvatarImage src={user?.avatar || "/user.jpg"} />}
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        )}
      </button>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && <MobileMenu onClose={toggleMenu} />}
      </AnimatePresence>
    </header>
  );
}
