import { AdminSidebar } from "@/components/features/admin/AdminSidebar";
import { AdminTopbar } from "@/components/features/admin/AdminTopbar";
import { Footer } from "@/components/layout/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-primary">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
      <Footer className="border-t border-line bg-bg-secondary" />
    </div>
  );
}
