'use client';

import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusSquare,
  BarChart2,
  User,
  Menu,
} from 'lucide-react';
import { Button } from '../ui/button';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SidebarGeneral({ children }: { children: React.ReactNode }) {
  const { logout } = useContext(AuthContext);
  const router = useRouter();


  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="bg-black text-white border-r border-neutral-800"
      >
        <SidebarContent className="bg-black text-white border-r border-neutral-800">
          <SidebarHeader>
            <h1 className="text-3xl font-semibold px-4 py-4 font-sans">PSW</h1>
          </SidebarHeader>

          <SidebarMenu className="px-2 space-y-1">
            <Link href="/" >
              <SidebarMenuItem>
                <SidebarMenuButton className='hover:cursor-pointer'>
                  <Home />
                  <span>Inicio</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Search />
                <span>Búsqueda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Compass />
                <span>Explorar</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/messages">
                <SidebarMenuButton className='hover:cursor-pointer'>
                  <MessageCircle />
                  <span>Mensajes</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Heart />
                <span>Notificaciones</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <Link href="/posts/create">
                <SidebarMenuButton className='hover:cursor-pointer'>
                  <PlusSquare />
                  <span>Crear</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>


            <SidebarMenuItem>
              <SidebarMenuButton>
                <BarChart2 />
                <span>Panel</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <User />
                <span>Perfil</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <Menu />
                <span>Más</span>
              </SidebarMenuButton>
            </SidebarMenuItem>


            <Button onClick={() => {
              router.push('/sub')
            }} className='hover: cursor-pointer hover:bg-blue-800' variant={'ghost'}>
              Suscribirse
            </Button>
            <Button onClick={logout} className="hover:cursor-pointer hover:bg-neutral-800">
              Cerrar Sesión
            </Button>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <div className="p-6 bg-black ">
          <SidebarTrigger className="hover:cursor-pointer" />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
