import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const SITE_TITLE = "Deepika & Harsh | December 13, 2026";
const SITE_DESCRIPTION =
  "Join us as we celebrate our two-state wedding across Bangalore & Kolkata. December 2026.";

export const metadata: Metadata = {
  metadataBase: new URL("https://deepi-ka-harsh.vercel.app"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: ["Deepika", "Harsh", "wedding", "Kolkata", "Bangalore", "India", "celebration"],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    images: [
      {
        url: "/images/couple-hills.jpg",
        width: 1200,
        height: 630,
        alt: "Deepika & Harsh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/couple-hills.jpg"],
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
        <ScrollProgress />
        <Navbar />
        <main className="flex-grow pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
