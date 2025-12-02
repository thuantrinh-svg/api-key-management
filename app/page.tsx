"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ApiKeyCard } from "./components/api-key-card";
import { ApiKeyTable } from "./components/api-key-table";
import { ApiKeyDialog } from "./components/api-key-dialog";
import { useApiKeys } from "./hooks/useApiKeys";
import { type ApiKey } from "./lib/supabase/client";

export default function Home() {
  const {
    apiKeys,
    loading,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    copyToClipboard,
  } = useApiKeys();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);

  const handleCreateClick = () => {
    setDialogMode("create");
    setEditingKey(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (apiKey: ApiKey) => {
    setDialogMode("edit");
    setEditingKey(apiKey);
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async (name: string) => {
    if (dialogMode === "create") {
      await createApiKey(name);
    } else if (editingKey) {
      await updateApiKey(editingKey.id, name);
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this API key? This action cannot be undone."
      )
    ) {
      await deleteApiKey(id);
    }
  };

  // Calculate total usage from all keys
  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage_count, 0);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Overview
          </h1>
        </div>

        {/* Current Plan Card */}
        <div className="mb-8">
          <ApiKeyCard usageCount={totalUsage} usageLimit={1000} />
        </div>

        {/* API Keys Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              API Keys
            </h2>
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create New Key
            </button>
          </div>

          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            The key is used to authenticate your requests to the Research API.
            To learn more, see the documentation page.
          </p>

          {loading ? (
            <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-12 dark:border-gray-800 dark:bg-gray-950">
              <div className="text-center">
                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600 dark:border-gray-800 dark:border-t-purple-400"></div>
                <p className="text-gray-500 dark:text-gray-400">
                  Loading API keys...
                </p>
              </div>
            </div>
          ) : (
            <ApiKeyTable
              apiKeys={apiKeys}
              onCopy={copyToClipboard}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          )}
        </div>
      </div>

      {/* Dialog */}
      <ApiKeyDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        editingKey={editingKey}
        mode={dialogMode}
      />
    </div>
  );
}
