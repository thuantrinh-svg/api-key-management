import { supabase } from "@/app/lib/supabase/client";

interface ApiKeyData {
  id: string;
  usage_count: number;
  limit: number;
}

export async function validateApiKey(
  apiKey: string
): Promise<ApiKeyData | null> {
  try {
    const { data: apiKeyData, error: apiKeyError } = await supabase
      .from("api_keys")
      .select("id, usage_count, limit")
      .eq("key", apiKey)
      .maybeSingle();

    if (apiKeyError) {
      console.error("Error validating API key:", apiKeyError);
      throw apiKeyError;
    }

    return apiKeyData;
  } catch (error) {
    console.error("Error validating API key:", error);
    throw error;
  }
}

export async function incrementApiKeyUsage(
  apiKeyData: ApiKeyData
): Promise<{ success: boolean; message: string }> {
  try {
    if (apiKeyData.usage_count >= apiKeyData.limit) {
      return {
        success: false,
        message: `Rate limit exceeded. You have reached your limit of ${apiKeyData.limit} requests.`,
      };
    }

    const { error: updateError } = await supabase
      .from("api_keys")
      .update({ usage_count: apiKeyData.usage_count + 1 })
      .eq("id", apiKeyData.id);

    if (updateError) {
      console.error("Error updating API key usage:", updateError);
      throw updateError;
    }

    return { success: true, message: "Usage incremented successfully" };
  } catch (error) {
    console.error("Error incrementing API key usage:", error);
    throw error;
  }
}
