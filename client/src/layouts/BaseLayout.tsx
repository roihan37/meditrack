import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { ProtectedRoute } from "@/context/ProtectedRoute";


export function BaseLayout() {
  return (
    <ProtectedRoute>
      <SidebarProvider
        style={{
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties}
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader/>
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );




}