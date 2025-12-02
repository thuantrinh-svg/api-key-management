"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Chrome } from "lucide-react";

export default function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();

  // Redirect to home if already signed in
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-950">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            API Key Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to manage your API keys and access the GitHub summarizer
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white px-4 py-3 font-semibold text-gray-900 transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-800"
        >
          <Chrome className="h-5 w-5" />
          Sign in with Google
        </button>

        {/* Features */}
        <div className="mt-8 space-y-4 border-t border-gray-200 pt-8 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
            Features:
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              Secure API key management
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              GitHub repository summarizer
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              Interactive API playground
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
              Track usage and analytics
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500">
          <p>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

