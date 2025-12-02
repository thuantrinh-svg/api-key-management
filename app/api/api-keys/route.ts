import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";

// Generate a random API key
function generateApiKey(): string {
  const prefix = "thuantv-";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = prefix;
  for (let i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// GET - Fetch all API keys
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching API keys:", error);
      return NextResponse.json(
        { error: "Failed to fetch API keys" },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST - Create a new API key
export async function POST(request: Request) {
  try {
    const { name, limit = 1000 } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (typeof limit !== "number" || limit < 1) {
      return NextResponse.json(
        { error: "Limit must be a positive number" },
        { status: 400 },
      );
    }

    const newKey = generateApiKey();

    const { data, error } = await supabase
      .from("api_keys")
      .insert([
        {
          name: name.trim(),
          key: newKey,
          usage_count: 0,
          limit,
          user_id: "00000000-0000-0000-0000-000000000000", // Placeholder for demo
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating API key:", error);
      return NextResponse.json(
        { error: "Failed to create API key" },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
