import { DashboardNavbar } from "@/components/layout/DashboardNavbar";
import { DashboardSidebar } from "@/components/features/dashboard/DashboardSidebar";
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
          <DashboardNavbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>

      {/* Footer spans full viewport width, below sidebar */}
      <Footer className="border-t-0 bg-[#50321C80]" />
    </div>
  );
}
