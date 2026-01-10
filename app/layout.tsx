import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./сomponents/Providers/Providers";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-Inter",
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Camper rental service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
