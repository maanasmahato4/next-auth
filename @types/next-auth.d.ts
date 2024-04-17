import { IUser } from "@/lib/actions/authActions";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
  }
}
