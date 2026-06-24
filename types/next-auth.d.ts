import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role?: string;
    token?: string;
    isProfileComplete?: boolean;
  }

  interface Session {
    user: User & {
      id: string;
      role?: string;
      token?: string;
      isProfileComplete?: boolean;
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    token?: string;
    isProfileComplete?: boolean;
  }
}
