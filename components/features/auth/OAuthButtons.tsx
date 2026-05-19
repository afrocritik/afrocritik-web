import { api } from "@/lib/api";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1877F2">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6 4.39 10.97 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.04 24 18.07 24 12.07z" />
  </svg>
);

export function OAuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      <a
        href={api.auth.googleUrl}
        className="flex items-center justify-center gap-3 rounded-md border border-orange-400/40 bg-transparent py-3 text-sm font-medium font-inter text-white transition-colors hover:bg-amber-soft"
      >
        <GoogleIcon />
        Continue with Google
      </a>
      <a
        href={api.auth.facebookUrl}
        className="flex items-center justify-center gap-3 rounded-md border border-amber-line bg-transparent py-3 text-sm font-medium font-inter text-white transition-colors hover:bg-amber-soft"
      >
        <FacebookIcon />
        Continue with Facebook
      </a>
    </div>
  );
}

export function OrDivider() {
  return (
    <div className="flex items-center gap-4">
      <span className="flex-1 h-[1.50px] opacity-80 bg-orange-400" />
      <span className="text-sm text-white">Or</span>
      <span className="flex-1 h-[1.50px] opacity-80 bg-orange-400" />
    </div>
  );
}
