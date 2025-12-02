"use client";

import { Eye, Copy, Edit, Trash2 } from "lucide-react";
import { type ApiKey } from "@/app/lib/supabase/client";
import { cn } from "@/app/lib/utils";
import { useState } from "react";

interface ApiKeyTableProps {
  apiKeys: ApiKey[];
  onCopy: (key: string, name: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

export function ApiKeyTable({
  apiKeys,
  onCopy,
  onEdit,
  onDelete,
}: ApiKeyTableProps) {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const maskKey = (key: string, isVisible: boolean) => {
    if (isVisible) return key;
    const prefix = key.substring(0, 10);
    return `${prefix}${"*".repeat(key.length - 10)}`;
  };

  if (apiKeys.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          No API keys yet. Create your first key to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <table className="w-full">
        <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Usage
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Key
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Options
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {apiKeys.map((apiKey) => {
            const isVisible = visibleKeys.has(apiKey.id);
            return (
              <tr
                key={apiKey.id}
                className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {apiKey.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {apiKey.usage_count}
                </td>
                <td className="px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300">
                  {maskKey(apiKey.key, isVisible)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className={cn(
                        "rounded-lg p-2 transition-colors",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        "text-gray-600 dark:text-gray-400"
                      )}
                      aria-label={isVisible ? "Hide key" : "Show key"}
                      title={isVisible ? "Hide key" : "Show key"}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onCopy(apiKey.key, apiKey.name)}
                      className={cn(
                        "rounded-lg p-2 transition-colors",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        "text-gray-600 dark:text-gray-400"
                      )}
                      aria-label="Copy key"
                      title="Copy key"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(apiKey)}
                      className={cn(
                        "rounded-lg p-2 transition-colors",
                        "hover:bg-gray-100 dark:hover:bg-gray-800",
                        "text-gray-600 dark:text-gray-400"
                      )}
                      aria-label="Edit key"
                      title="Edit key"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(apiKey.id)}
                      className={cn(
                        "rounded-lg p-2 transition-colors",
                        "hover:bg-red-100 dark:hover:bg-red-950",
                        "text-red-600 dark:text-red-400"
                      )}
                      aria-label="Delete key"
                      title="Delete key"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

