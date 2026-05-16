import { Logo } from "./Logo";

export function AuthHeader() {
  return (
    <header className="w-full border-b border-amber-line bg-bg-secondary">
      <div className="container flex h-[72px] items-center">
        <Logo />
      </div>
    </header>
  );
}
