interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <div className="relative overflow-hidden bg-yellow-900 lg:h-[1024px]">
      {/* Portrait — height-fitted so the full figure shows naturally; bleeds behind the form panel */}
      <div
        className="absolute inset-0 hidden bg-no-repeat bg-left-top lg:block"
        style={{
          backgroundImage: "url('/SI-bg.png')",
          backgroundSize: "auto 100%",
        }}
      />

      {/* Form panel: full-width on mobile, overlaid from the right on desktop */}
      <div className="relative z-10 flex min-h-dvh items-center justify-center px-6 md:px-12 lg:absolute lg:inset-y-0 lg:right-0 lg:min-h-0 lg:w-[57%] lg:rounded-l-[40px] lg:bg-[#59341F] lg:items-start lg:pt-40">
        <div className="w-full max-w-[600px]">{children}</div>
      </div>
    </div>
  );
}
