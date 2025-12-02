import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { supabase } from "./supabase/client";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  image?: string;
}

/**
 * Get authenticated session user from the database
 * Requires user to be signed in via NextAuth
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    // Get user from Supabase
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, name, image")
      .eq("email", session.user.email)
      .single();

    if (error) {
      console.error("Error fetching user from database:", error);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error in getSessionUser:", error);
    return null;
  }
}

/**
 * Get user's API keys from the database
 */
export async function getUserApiKeys(userId: string) {
  const { data, error } = await supabase
    .from("api_keys")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user API keys:", error);
    throw error;
  }

  return data;
}

/**
 * Create API key for authenticated user
 */
export async function createUserApiKey(
  userId: string,
  name: string,
  key: string
) {
  const { data, error } = await supabase
    .from("api_keys")
    .insert([{ user_id: userId, name, key, usage_count: 0 }])
    .select()
    .single();

  if (error) {
    console.error("Error creating API key:", error);
    throw error;
  }

  return data;
}

