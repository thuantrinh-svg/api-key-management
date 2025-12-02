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

const maskKey = (key: string, isVisible: boolean) => {
  if (isVisible) return key;
  const prefix = key.substring(0, 10);
  return `${prefix}${"*".repeat(key.length - 10)}`;
};

interface ApiKeyRowProps {
  apiKey: ApiKey;
  isVisible: boolean;
  onToggleVisibility: () => void;
  onCopy: (key: string, name: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

function ApiKeyTableRow({
  apiKey,
  isVisible,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete,
}: ApiKeyRowProps) {
  const remaining = apiKey.limit - apiKey.usage_count;
  const usagePercentage = (apiKey.usage_count / apiKey.limit) * 100;

  return (
    <tr className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900">
      <td className="whitespace-nowrap px-4 md:px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
        {apiKey.name}
      </td>
      <td className="whitespace-nowrap px-4 md:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex flex-col">
          <span className="font-medium">
            {apiKey.usage_count} / {apiKey.limit}
          </span>
          <span className="text-xs text-gray-400">{remaining} remaining</span>
        </div>
      </td>
      <td className="hidden md:table-cell px-6 py-4 text-sm font-mono text-gray-700 dark:text-gray-300 truncate max-w-xs">
        {maskKey(apiKey.key, isVisible)}
      </td>
      <td className="whitespace-nowrap px-4 md:px-6 py-4 text-right text-sm">
        <div className="flex items-center justify-end gap-1 md:gap-2">
          <button
            onClick={onToggleVisibility}
            className={cn(
              "rounded-lg p-2 transition-colors",
              "hover:bg-gray-100 dark:hover:bg-gray-800",
              "text-gray-600 dark:text-gray-400",
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
              "text-gray-600 dark:text-gray-400",
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
              "text-gray-600 dark:text-gray-400",
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
              "text-red-600 dark:text-red-400",
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
}

interface ApiKeyCardItemProps {
  apiKey: ApiKey;
  isVisible: boolean;
  onToggleVisibility: () => void;
  onCopy: (key: string, name: string) => void;
  onEdit: (apiKey: ApiKey) => void;
  onDelete: (id: string) => void;
}

function ApiKeyCardItem({
  apiKey,
  isVisible,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete,
}: ApiKeyCardItemProps) {
  const remaining = apiKey.limit - apiKey.usage_count;
  const usagePercentage = (apiKey.usage_count / apiKey.limit) * 100;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
          {apiKey.name}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(apiKey)}
            className="rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            aria-label="Edit key"
            title="Edit key"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(apiKey.id)}
            className="rounded-lg p-2 transition-colors hover:bg-red-100 dark:hover:bg-red-950 text-red-600 dark:text-red-400"
            aria-label="Delete key"
            title="Delete key"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mb-4 space-y-3">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
            API Key
          </p>
          <p className="mt-1 break-all font-mono text-sm text-gray-700 dark:text-gray-300">
            {maskKey(apiKey.key, isVisible)}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
            Quota Usage
          </p>
          <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
            {apiKey.usage_count} / {apiKey.limit} requests
          </p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                usagePercentage <= 50 && "bg-green-500",
                usagePercentage > 50 &&
                  usagePercentage <= 80 &&
                  "bg-yellow-500",
                usagePercentage > 80 && "bg-red-500",
              )}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            {remaining} requests remaining
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onToggleVisibility}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Eye className="h-4 w-4 inline mr-2" />
          {isVisible ? "Hide" : "Show"}
        </button>
        <button
          onClick={() => onCopy(apiKey.key, apiKey.name)}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Copy className="h-4 w-4 inline mr-2" />
          Copy
        </button>
      </div>
    </div>
  );
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

  if (apiKeys.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 md:p-12 text-center dark:border-gray-800 dark:bg-gray-950">
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          No API keys yet. Create your first key to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {apiKeys.map((apiKey) => {
          const isVisible = visibleKeys.has(apiKey.id);
          return (
            <ApiKeyCardItem
              key={apiKey.id}
              apiKey={apiKey}
              isVisible={isVisible}
              onToggleVisibility={() => toggleKeyVisibility(apiKey.id)}
              onCopy={onCopy}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <table className="w-full">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Usage / Limit
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
                <ApiKeyTableRow
                  key={apiKey.id}
                  apiKey={apiKey}
                  isVisible={isVisible}
                  onToggleVisibility={() => toggleKeyVisibility(apiKey.id)}
                  onCopy={onCopy}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
