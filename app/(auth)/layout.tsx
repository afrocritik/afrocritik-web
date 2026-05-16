import { AuthHeader } from "@/components/layout/AuthHeader";
import { Footer } from "@/components/layout/Footer";

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <AuthHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
