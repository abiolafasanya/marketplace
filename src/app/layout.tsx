import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/sonner";
import AppInitProvider from "./components/AppInitProvider";
import ThemeClientWrapper from "@/components/themeClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MarketPlaceX",
  description: "Market Place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full mx-auto bg-background text-foreground`}
      >
        <ThemeClientWrapper /> {/* ✅ Applies theme on client */}
        <AppInitProvider>
          <Header />
          {children}
          <Footer />
        </AppInitProvider>
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      </body>
    </html>
  );
}
