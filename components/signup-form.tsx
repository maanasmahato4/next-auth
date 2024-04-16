"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { z } from "zod";
import validator from "validator";
import { SubmitHandler, useForm, Controller } from "react-hook-form";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(6, "user name should be atleast 6 characters")
      .max(30, "user name must be at max 30 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z.string().email("please enter a valid email"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "enter a valid phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => ({
        message: "Please accept all terms",
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password and confirm password does not match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export default function SignUpForm() {
  const { register, handleSubmit, reset, control } = useForm<InputType>();

  const saveUser: SubmitHandler<InputType> = async (data) => {
    console.log(data);
  };
  return (
    <div className="shadow-sm shadow-white p-8 rounded-md">
      <h3 className="text-center my-4">Sign Up</h3>
      <form
        className="flex flex-col gap-4 w-[40vw]"
        onSubmit={handleSubmit(saveUser)}
      >
        <Input {...register("username")} label="Full Name" type="text" />
        <Input {...register("email")} label="Email" type="email" />
        <Input {...register("phone")} label="Phone" type="text" />
        <Input {...register("password")} label="Password" type="password" />
        <Input
          {...register("confirmPassword")}
          label="Confirm Password"
          type="password"
        />
        <div className="flex flex-row justify-between items-center">
          <Controller
            control={control}
            name="accepted"
            render={({ field }) => (
              <Checkbox
                {...register("accepted")}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                I Accept the
                <Link href="#" className="text-purple-200 underline">
                  terms and conditons
                </Link>
              </Checkbox>
            )}
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
      <div>
        <p>
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-purple-200 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
