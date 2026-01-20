"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createUser, verifyUser } from "@/lib/users";
import { useRouter } from "next/navigation";
import { generateToken, saveAuthData } from "@/lib/auth";
import GuestRoute from "./GuestRoute";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (type === "sign-up") {
        const newUser = await createUser(
          values.fullName || "",
          values.email,
          values.password,
        );

        const token = generateToken(newUser.id);

        saveAuthData(token, newUser);
        router.push("/");
      } else {
        const user = await verifyUser(values.email, values.password);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        const token = generateToken(user.id);
        saveAuthData(token, user);

        router.push("/");
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GuestRoute>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex max-h-200 w-full max-w-145 flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8"
          >
            <h1 className="text-[30px] leading-10 font-bold">
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </h1>
            {type === "sign-up" && (
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="form-item">
                      <FormLabel className="form-label">Full Name</FormLabel>
                      <FormControl className="">
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormMessage className="form-message" />
                    </div>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="form-item">
                    <FormLabel className="form-label">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="form-message" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="form-item">
                    <FormLabel className="form-label">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage className="form-message" />
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="btn-primary">
              {type === "sign-in" ? "Login" : "Register"}
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>

            {errorMessage && <p className="text-red-500">*{errorMessage}</p>}
            <div className="flex justify-center text-sm">
              <p className="text-gray-500">
                {type === "sign-in"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                className="ml-1 font-medium text-secondary"
              >
                {type === "sign-in" ? "Create One here" : "Sign in here"}
              </Link>
            </div>
          </form>
        </Form>
      </GuestRoute>
    </>
  );
};
export default AuthForm;
