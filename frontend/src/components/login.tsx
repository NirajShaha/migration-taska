// // "use client";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { Card } from "@/components/ui/card"; // Updated relative path to absolute for consistency
// // import {
// //   Field,
// //   FieldError,
// //   FieldGroup,
// //   FieldLabel,
// // } from "@/components/ui/field";
// // import { Input } from "@/components/ui/input";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Controller, useForm } from "react-hook-form";
// // import { z } from "zod";
// // import axios from "axios";
// // import { redirect, useRouter } from "next/navigation";
// // // import { NEXT_API_ENDPOINT } from "@/env"
// // const loginSchema = z.object({
// //   email: z.email("Please enter a valid email address."),
// //   password: z.string().min(4, "Password must be at least 4 characters."),
// // });

// // type LoginFormValues = z.infer<typeof loginSchema>;

// // export function LoginForm({
// //   className,
// //   ...props
// // }: React.ComponentProps<"form">) {
// //   const router = useRouter();
// //   const form = useForm<LoginFormValues>({
// //     resolver: zodResolver(loginSchema),
// //     defaultValues: {
// //       email: "",
// //       password: "",
// //     },
// //   });

// //   const onSubmit = async (data: LoginFormValues) => {
// //     try {
// //       const response = await axios.post(
// //         `http://localhost:8081/auth/login`,
// //         data
// //       );
// //       console.log("Login successful:", response.data);

// //       if(response.status === 200){
// //         router.push("/");
// //       }
// //     } catch (error) {
// //         console.error("failed login");
// //     };
// //   };

// //   return (
// //     <Card className="p-4">
// //       <form
// //         className={cn("flex flex-col gap-6 p-2", className)}
// //         onSubmit={form.handleSubmit(onSubmit)}
// //         {...props}
// //       >
// //         <FieldGroup>
// //           <div className="flex flex-col items-center gap-1 text-center">
// //             <h1 className="text-2xl font-bold">Login to your account</h1>
// //           </div>

// //           <Controller
// //             name="email"
// //             control={form.control}
// //             render={({ field, fieldState }) => (
// //               <Field data-invalid={fieldState.invalid}>
// //                 <FieldLabel htmlFor="email">Email</FieldLabel>
// //                 <Input
// //                   {...field}
// //                   id="email"
// //                   type="email"
// //                   placeholder="name@example.com"
// //                   autoComplete="email"
// //                 />
// //                 {/* FIX: Safely extract the error message string */}
// //                 {fieldState.invalid && fieldState.error?.message && (
// //                   <FieldError>{fieldState.error.message}</FieldError>
// //                 )}
// //               </Field>
// //             )}
// //           />

// //           <Controller
// //             name="password"
// //             control={form.control}
// //             render={({ field, fieldState }) => (
// //               <Field data-invalid={fieldState.invalid}>
// //                 <div className="flex items-center">
// //                   <FieldLabel htmlFor="password">Password</FieldLabel>
// //                   <a
// //                     href="#"
// //                     className="ml-auto text-sm underline-offset-4 hover:underline"
// //                   >
// //                     Forgot your password?
// //                   </a>
// //                 </div>
// //                 <Input
// //                   {...field}
// //                   id="password"
// //                   type="password"
// //                   placeholder="••••••••"
// //                   autoComplete="current-password"
// //                 />
// //                 {/* FIX: Safely extract the error message string */}
// //                 {fieldState.invalid && fieldState.error?.message && (
// //                   <FieldError>{fieldState.error.message}</FieldError>
// //                 )}
// //               </Field>
// //             )}
// //           />

// //           <Button type="submit" disabled={form.formState.isSubmitting}>
// //             {form.formState.isSubmitting ? "Logging in..." : "Login"}
// //           </Button>
// //         </FieldGroup>
// //       </form>
// //     </Card>
// //   );
// // }

// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";

// const loginSchema = z.object({
//   email: z.string().email("Please enter a valid email address."),
//   password: z.string().min(4, "Password must be at least 4 characters."),
// });

// type LoginFormValues = z.infer<typeof loginSchema>;

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {
//   const router = useRouter();
//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     try {
//       // Call NextAuth's signIn method
//       const result = await signIn("credentials", {
//         email: data.email,
//         password: data.password,
//         redirect: false, // Set to false so we can handle errors on this page
//       });

//       if (result?.error) {
//         console.error("Login failed:", result.error);
//         // Set a global error to the form so the user knows they failed
//         form.setError("root", {
//           type: "manual",
//           message: "Invalid email or password",
//         });
//       } else if (result?.ok) {
//         console.log("Login successful!");
//         router.push("/dashboard"); // Change this to wherever you want users to go after logging in
//         router.refresh(); // Refreshes server components to reflect the new auth state
//       }
//     } catch (error) {
//       console.error("An unexpected error occurred:", error);
//       form.setError("root", {
//         type: "manual",
//         message: "An unexpected error occurred. Please try again.",
//       });
//     }
//   };

//   return (
//     <Card className="p-4">
//       <form
//         className={cn("flex flex-col gap-6 p-2", className)}
//         onSubmit={form.handleSubmit(onSubmit)}
//         {...props}
//       >
//         <FieldGroup>
//           <div className="flex flex-col items-center gap-1 text-center">
//             <h1 className="text-2xl font-bold">Login to your account</h1>
//           </div>

//           <Controller
//             name="email"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   {...field}
//                   id="email"
//                   type="email"
//                   placeholder="name@example.com"
//                   autoComplete="email"
//                 />
//                 {fieldState.invalid && fieldState.error?.message && (
//                   <FieldError>{fieldState.error.message}</FieldError>
//                 )}
//               </Field>
//             )}
//           />

//           <Controller
//             name="password"
//             control={form.control}
//             render={({ field, fieldState }) => (
//               <Field data-invalid={fieldState.invalid}>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   <a
//                     href="#"
//                     className="ml-auto text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input
//                   {...field}
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   autoComplete="current-password"
//                 />
//                 {fieldState.invalid && fieldState.error?.message && (
//                   <FieldError>{fieldState.error.message}</FieldError>
//                 )}
//               </Field>
//             )}
//           />

//           {/* Display global errors (like invalid credentials from the backend) */}
//           {form.formState.errors.root && (
//             <div className="text-sm font-medium text-destructive text-red-500">
//               {form.formState.errors.root.message}
//             </div>
//           )}

//           <Button type="submit" disabled={form.formState.isSubmitting}>
//             {form.formState.isSubmitting ? "Logging in..." : "Login"}
//           </Button>
//         </FieldGroup>
//       </form>
//     </Card>
//   );
// }

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(4, "Password must be at least 4 characters."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // CRITICAL: Do not let NextAuth hijack the router
      });

      if (result?.error) {
        form.setError("root", {
          type: "manual",
          message: "Invalid email or password",
        });
      } else if (result?.ok) {
        // Read where the user originally wanted to go, default to "/"
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

        router.refresh(); // Sync the server components with the new auth token
        router.push(callbackUrl); // Send them on their way
      }
    } catch (error) {
      form.setError("root", {
        type: "manual",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Card className="p-4 border-slate-700/50 bg-slate-800/50 backdrop-blur-xl shadow-2xl text-white">
      <form
        className={cn("flex flex-col gap-6 p-2", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center mb-4">
            <h1 className="text-2xl font-bold">Login to your account</h1>
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className="text-slate-300">
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="email"
                  className="bg-slate-900 border-slate-700 text-white"
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <FieldError className="text-red-400">
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-slate-300">
                    Password
                  </FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm text-blue-400 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="bg-slate-900 border-slate-700 text-white"
                />
                {fieldState.invalid && fieldState.error?.message && (
                  <FieldError className="text-red-400">
                    {fieldState.error.message}
                  </FieldError>
                )}
              </Field>
            )}
          />

          {form.formState.errors.root && (
            <div className="text-sm font-medium text-red-400 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-center">
              {form.formState.errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </FieldGroup>
      </form>
    </Card>
  );
}
 