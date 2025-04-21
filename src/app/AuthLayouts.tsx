'use client';

import SidebarGeneral from "@/components/_shared/SidebarGeneral";
import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";


export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

    const { user } = useContext(AuthContext);

    if (!user ) return <> {children} </>

    return <SidebarGeneral>{children}</SidebarGeneral>

}