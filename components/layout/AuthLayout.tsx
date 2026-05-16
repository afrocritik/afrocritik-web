interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Split auth layout — portrait imagery on the left, form panel on the right,
 * wrapped in a single rounded container on a medium-brown background.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="container py-8 md:py-12">
      <div className="grid overflow-hidden rounded-2xl lg:grid-cols-2">
        {/* Left: portrait */}
        <div className="relative hidden min-h-[640px] lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/auth-portrait.jpg')" }}
          />
          {/* Decorative fallback when the portrait asset is absent */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#5C2E00] via-[#3D1F00] to-[#1C0A00]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-secondary/30" />
        </div>

        {/* Right: form */}
        <div className="flex items-center justify-center bg-bg-secondary px-6 py-12 md:px-12 lg:py-16">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
