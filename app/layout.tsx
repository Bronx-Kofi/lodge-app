import type { Metadata } from "next";
import { inter, playfair } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miky Hillside Lodge",
  description: "Off-Grid Luxury in Ghana's Bono Region",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5, // Allow zoom for accessibility
    userScalable: true,
  },
  themeColor: '#FF6B35',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Miky Lodge',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to critical external domains for faster loading */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
