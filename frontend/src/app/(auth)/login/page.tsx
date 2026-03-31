import { Suspense } from "react";
import { LoginForm } from "@/components/login";
import { Loader2 } from "lucide-react";

// A simple loading spinner to show while the searchParams are resolving
function LoginFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-slate-950">
      {/* Decorative Left Side */}
      <div className="relative hidden bg-slate-900 lg:block border-r border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-3xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              WVTA Management
            </h2>
            <p className="text-slate-400 text-lg">
              Secure Certificate of Conformity Portal
            </p>
          </div>
        </div>
      </div>

      {/* Login Form Right Side */}
      <div className="flex flex-col gap-4 p-6 md:p-10 justify-center">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            {/* Suspense is required here because LoginForm uses useSearchParams() */}
            <Suspense fallback={<LoginFallback />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}