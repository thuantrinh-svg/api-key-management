"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    Callback: "There was an error during sign in. Please try again.",
    OAuthSignin: "Error connecting to Google. Please try again.",
    OAuthCallback: "Error processing sign in. Please try again.",
    EmailSigninEmail: "Email sign in is not available.",
    Default: "An authentication error occurred. Please try again.",
  };

  const message =
    errorMessages[error as keyof typeof errorMessages] || errorMessages.Default;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-950">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-red-100 p-3 dark:bg-red-950">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Sign In Error
        </h1>

        <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
          {message}
        </p>

        {error && (
          <div className="mb-6 rounded-lg bg-gray-100 p-3 text-xs text-gray-600 dark:bg-gray-900 dark:text-gray-400">
            <code>{error}</code>
          </div>
        )}

        <Link
          href="/auth/signin"
          className="mb-4 block w-full rounded-lg bg-purple-600 px-4 py-2 text-center font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Try Again
        </Link>

        <Link
          href="/"
          className="flex items-center justify-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}

