import { Logo } from "./Logo";

export function AuthHeader() {
  return (
    <header className="w-full border-b border-amber-line" style={{ background: "#3B1E08" }}>
      <div className="container flex items-center pt-8 pb-7">
        <Logo />
      </div>
    </header>
  );
}
