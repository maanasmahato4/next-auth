"use client";

import { Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";

export default function SignUpForm() {
  return (
    <div className="shadow-sm shadow-white p-8 rounded-md">
      <h3 className="text-center my-4">Sign Up</h3>
      <form className="flex flex-col gap-4 w-[40vw]">
        <Input label="Email" type="email" />
        <Input label="Phone" type="text" />
        <Input label="Password" type="password" />
        <Input label="Confirm Password" type="password" />
        <Checkbox>
          I Accept the{" "}
          <Link href="#" className="text-purple-200 underline">
            terms and conditons
          </Link>
        </Checkbox>
      </form>
    </div>
  );
}
