import "../globals.css";
import { inter, playfair } from "@/lib/fonts";

export { metadata, viewport } from "next-sanity/studio";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans text-dark bg-white-warm">{children}</body>
    </html>
  );
}
