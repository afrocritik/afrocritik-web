import { Toaster } from "sonner";
import { AdminSidebar } from "@/components/features/admin/AdminSidebar";
import { AdminTopbar } from "@/components/features/admin/AdminTopbar";
import { SmallScreenNotice } from "@/components/features/admin/SmallScreenNotice";
import { Footer } from "@/components/layout/Footer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Below lg (1024px): steer to a larger screen */}
      <div className="lg:hidden">
        <SmallScreenNotice />
      </div>

      {/* lg and up: the full admin */}
      <div className="hidden min-h-screen flex-col bg-[#160907] lg:flex">
        <div className="flex flex-1">
          <AdminSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminTopbar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
        <Footer className="border-t-0 bg-[#50321C80]" />
      </div>

      <Toaster
        position="bottom-right"
        theme="dark"
        richColors
        toastOptions={{
          className: "font-inter",
        }}
      />
    </>
  );
}
