"use client";

import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function AuthButton() {
  const { data: session } = useSession();
  const label = session ? "Log Out" : "Sign In";
  const path = session ? "/auth/logout" : "/auth/signin";
  return (
    <Link href={path}>
      <Button>{label}</Button>
    </Link>
  );
}
