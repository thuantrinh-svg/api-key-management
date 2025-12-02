"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, User } from "lucide-react";

export function AuthButton() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Profile"}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
              <User className="h-4 w-4 text-white" />
            </div>
          )}
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {session.user.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {session.user.email}
            </p>
          </div>
        </div>
        <button
          onClick={() =>
            signOut({ redirect: false }).then(() => router.push("/"))
          }
          className="flex items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
    >
      <LogIn className="h-4 w-4" />
      <span>Sign In with Google</span>
    </button>
  );
}
