import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { Providers } from './providers';
import SidebarGeneral from '../components/_shared/SidebarGeneral';
import AuthenticatedLayout from './AuthLayouts';

const outfit = Outfit({ subsets: ["latin"] })

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
        className={`${outfit.className} bg-gray-200`}>
        <main>
          <Providers>
            <AuthenticatedLayout>
              {children}
            </AuthenticatedLayout>
          </Providers>
        </main>
      </body>
    </html>
  );
}
