"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { User, StopCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/themes";

interface Props {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: Props) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-md dark:shadow-white/10 flex flex-col px-6 py-4 space-y-3 z-50 md:hidden"
    >
      <Link
        href="/listings"
        onClick={onClose}
        className="text-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-white"
      >
        Browse
      </Link>
      <Link
        href="/listings/add"
        onClick={onClose}
        className="text-muted-foreground hover:text-primary dark:text-gray-300 dark:hover:text-white"
      >
        List Item
      </Link>

      {user ? (
        <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start px-2 text-sm dark:text-white"
            onClick={() => {
              router.push("/profile");
              onClose();
            }}
          >
            <User className="w-4 h-4 mr-2" /> Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-2 text-sm dark:text-white"
            onClick={() => {
              router.push("/store");
              onClose();
            }}
          >
            <StopCircle className="w-4 h-4 mr-2" /> My Store
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start px-2 text-sm dark:text-white"
            onClick={() => {
              router.push("/help");
              onClose();
            }}
          >
            <Info className="w-4 h-4 mr-2" /> Help
          </Button>
          <Button
            variant="outline"
            className="w-full justify-center mt-2 dark:border-gray-500 dark:text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href="/login" onClick={onClose}>
          <Button
            variant="outline"
            className="w-full mt-2 dark:border-gray-500 dark:text-white"
          >
            Login
          </Button>
        </Link>
      )}
      <div className="pt-2 border-t">
        <ThemeToggle />
      </div>
    </motion.div>
  );
}
