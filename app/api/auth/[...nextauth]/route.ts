import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/app/lib/supabase/client";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn(
    "Google OAuth credentials not configured. Sign in will not work."
  );
}

if (!process.env.NEXTAUTH_SECRET) {
  console.warn(
    "NEXTAUTH_SECRET not configured. Using a default secret (not recommended for production)."
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async signIn({ user }) {
      try {
        // Check if user already exists
        const { data: existingUser, error: selectError } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();

        if (selectError && selectError.code !== "PGRST116") {
          // PGRST116 means no rows found, which is expected
          console.error("Error checking user existence:", selectError);
          return;
        }

        // If user doesn't exist, create them
        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert([
            {
              email: user.email,
              name: user.name || "User",
              image: user.image,
              created_at: new Date().toISOString(),
            },
          ]);

          if (insertError) {
            console.error("Error creating user in database:", insertError);
          }
        }
      } catch (error) {
        console.error("Error in signIn event:", error);
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Fetch user ID from database
        const { data } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();

        if (data) {
          token.id = data.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

