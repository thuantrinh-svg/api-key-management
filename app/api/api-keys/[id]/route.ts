import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase/client";

// GET - Fetch a single API key
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching API key:", error);
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
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

// PUT - Update an API key
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { name, limit } = await request.json();

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (limit !== undefined && (typeof limit !== "number" || limit < 1)) {
      return NextResponse.json(
        { error: "Limit must be a positive number" },
        { status: 400 },
      );
    }

    const updateData: { name: string; limit?: number } = { name: name.trim() };
    if (limit !== undefined) {
      updateData.limit = limit;
    }

    const { data, error } = await supabase
      .from("api_keys")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating API key:", error);
      return NextResponse.json(
        { error: "Failed to update API key" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
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

// DELETE - Delete an API key
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { error } = await supabase.from("api_keys").delete().eq("id", id);

    if (error) {
      console.error("Error deleting API key:", error);
      return NextResponse.json(
        { error: "Failed to delete API key" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "API key deleted successfully" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
