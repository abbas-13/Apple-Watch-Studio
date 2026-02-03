import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { WatchContextHolder } from "./components/watchContextHolder";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apple Watch Studio",
  description: "Clone of the Apple Watch Studio page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WatchContextHolder>{children}</WatchContextHolder>
      </body>
    </html>
  );
}
