"use client";

import { Plus } from "lucide-react";
import { ApiKeyTable } from "../../components/api-key-table";
import { type ApiKey } from "../../lib/supabase/client";

interface ApiKeySectionProps {
  apiKeys: ApiKey[];
  loading: boolean;
  onCreateClick: () => void;
  onCopy: (key: string, name: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

export function ApiKeySection({
  apiKeys,
  loading,
  onCreateClick,
  onCopy,
  onEdit,
  onDelete,
}: ApiKeySectionProps) {
  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h2>
        <button
          onClick={onCreateClick}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Create New Key
        </button>
      </div>

      <p className="mb-6 text-xs md:text-sm text-gray-600 dark:text-gray-400">
        The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
      </p>

      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-8 md:p-12 dark:border-gray-800 dark:bg-gray-950">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600 dark:border-gray-800 dark:border-t-purple-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading API keys...</p>
          </div>
        </div>
      ) : (
        <ApiKeyTable apiKeys={apiKeys} onCopy={onCopy} onEdit={onEdit} onDelete={onDelete} />
      )}
    </div>
  );
}
