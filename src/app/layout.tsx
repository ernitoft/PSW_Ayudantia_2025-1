import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";

const outfit = Outfit({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "PSW - Ayudantía",
  description: "Ayudantia de Proyecto ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
