import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { DashboardSidebar } from "@/components/features/dashboard/DashboardSidebar";
import { DashboardMobileNav } from "@/components/features/dashboard/DashboardMobileNav";
import { Footer } from "@/components/layout/Footer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      {/* Sidebar + scrollable content area side by side */}
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Cap the working area on very wide monitors (HP/Dell 24"+ and up) so
              cards and forms don't stretch edge to edge. */}
          <div className="mx-auto flex w-full min-w-0 max-w-[1680px] flex-1 flex-col">
            <DashboardNavbar />
            {/* Small screens have no sidebar — give them a scrollable nav bar */}
            <DashboardMobileNav />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </div>

      {/* Footer spans full viewport width, below sidebar */}
      <Footer className="border-t-0 bg-[#50321C80]" />
    </div>
  );
}
