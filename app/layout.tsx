import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Deepi & Harsh | Wedding Celebration",
  description: "Join us as we celebrate our love. June 15, 2025 at The Garden Estate, Napa Valley.",
  keywords: ["wedding", "Sarah", "James", "celebration", "Napa Valley"],
  openGraph: {
    title: "Deepi & Harsh | Wedding Celebration",
    description: "Join us as we celebrate our love. June 15, 2025 at The Garden Estate, Napa Valley.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
