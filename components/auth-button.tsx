"use client";

import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function AuthButton() {
  const { data: session } = useSession();
  const label = session && session.user ? "Log Out" : "Sign In";
  const path =
    session && session.user ? "/api/auth/signout" : "/api/auth/signin";
  return (
    <div>
      <span className="text-white">{session?.user.username}</span>
      <Link href={path}>
        <Button>{label}</Button>
      </Link>
    </div>
  );
}
