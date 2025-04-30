import type { Metadata } from "next";

import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import Header from "@/app/_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-Josefin-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={` ${josefin.variable}`}
      >
        <Header />

        <div className=" flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children} </main>
        </div>
      </body>
    </html>
  );
}
