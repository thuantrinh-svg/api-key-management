"use client";

import { useState, useEffect, useCallback } from "react";
import { type ApiKey } from "@/app/lib/supabase/client";
import { toast } from "sonner";

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all API keys
  const fetchApiKeys = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/api-keys");

      if (!response.ok) {
        throw new Error("Failed to fetch API keys");
      }

      const data = await response.json();
      setApiKeys(data || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch API keys";
      setError(errorMessage);
      toast.error("Failed to load API keys", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new API key
  const createApiKey = useCallback(async (name: string) => {
    try {
      const response = await fetch("/api/api-keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create API key");
      }

      const data = await response.json();
      setApiKeys((prev) => [data, ...prev]);
      toast.success("API key created successfully", {
        description: `Key "${name}" has been created`,
      });

      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create API key";
      toast.error("Failed to create API key", {
        description: errorMessage,
      });
      throw err;
    }
  }, []);

  // Update an API key
  const updateApiKey = useCallback(async (id: string, name: string) => {
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update API key");
      }

      const data = await response.json();
      setApiKeys((prev) => prev.map((key) => (key.id === id ? data : key)));
      toast.success("API key updated successfully", {
        description: `Key renamed to "${name}"`,
      });

      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update API key";
      toast.error("Failed to update API key", {
        description: errorMessage,
      });
      throw err;
    }
  }, []);

  // Delete an API key
  const deleteApiKey = useCallback(
    async (id: string) => {
      try {
        const keyToDelete = apiKeys.find((key) => key.id === id);

        const response = await fetch(`/api/api-keys/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete API key");
        }

        setApiKeys((prev) => prev.filter((key) => key.id !== id));
        toast.success("API key deleted successfully", {
          description: keyToDelete
            ? `Key "${keyToDelete.name}" has been deleted`
            : "The API key has been deleted",
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to delete API key";
        toast.error("Failed to delete API key", {
          description: errorMessage,
        });
        throw err;
      }
    },
    [apiKeys]
  );

  // Copy API key to clipboard
  const copyToClipboard = useCallback((key: string, name: string) => {
    navigator.clipboard.writeText(key).then(
      () => {
        toast.success("API key copied", {
          description: `"${name}" copied to clipboard`,
        });
      },
      () => {
        toast.error("Failed to copy", {
          description: "Could not copy API key to clipboard",
        });
      }
    );
  }, []);

  // Fetch API keys on mount
  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  return {
    apiKeys,
    loading,
    error,
    fetchApiKeys,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    copyToClipboard,
  };
}

