"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "../dashboard-layout";
import { ApiKeyCard } from "../components/api-key-card";
import { ApiKeyDialog } from "../components/api-key-dialog";
import { DashboardHeader } from "./components/DashboardHeader";
import { ApiKeySection } from "./components/ApiKeySection";
import { useApiKeys } from "../hooks/useApiKeys";
import { type ApiKey } from "../lib/supabase/client";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);

  const {
    apiKeys,
    loading,
    createApiKey,
    updateApiKey,
    deleteApiKey,
    copyToClipboard,
  } = useApiKeys();

  // Removed auto-signin - middleware handles redirecting unauthenticated users
  // This prevents auto-signin after signout which was causing the bug

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600 dark:border-gray-800 dark:border-t-purple-400" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

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

  const handleDialogSubmit = async (name: string, limit: number) => {
    if (dialogMode === "create") {
      await createApiKey(name, limit);
    } else if (editingKey) {
      await updateApiKey(editingKey.id, name, limit);
    }
  };

  const handleDeleteClick = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this API key? This action cannot be undone.",
      )
    ) {
      await deleteApiKey(id);
    }
  };

  // Calculate total usage and total limit from all API keys
  const totalUsage = apiKeys.reduce((sum, key) => sum + key.usage_count, 0);
  const totalLimit = apiKeys.reduce((sum, key) => sum + key.limit, 0) || 1000;

  return (
    <DashboardLayout>
      <div className="min-h-screen w-full p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <DashboardHeader title="Overview" />

          {/* Current Plan Card */}
          <div className="mb-8 md:mb-10">
            <ApiKeyCard usageCount={totalUsage} usageLimit={totalLimit} />
          </div>

          {/* API Keys Section */}
          <ApiKeySection
            apiKeys={apiKeys}
            loading={loading}
            onCreateClick={handleCreateClick}
            onCopy={copyToClipboard}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
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
    </DashboardLayout>
  );
}
