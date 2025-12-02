"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { type ApiKey } from "@/app/lib/supabase/client";

interface ApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, limit: number) => Promise<void>;
  editingKey?: ApiKey | null;
  mode: "create" | "edit";
}

export function ApiKeyDialog({
  isOpen,
  onClose,
  onSubmit,
  editingKey,
  mode,
}: ApiKeyDialogProps) {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(1000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(editingKey?.name || "");
      setLimit(editingKey?.limit || 1000);
    }
  }, [isOpen, editingKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (limit < 1) return;

    setIsSubmitting(true);
    try {
      await onSubmit(name.trim(), limit);
      setName("");
      setLimit(1000);
      onClose();
    } catch (error) {
      // Error is handled by the hook with toast
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      setLimit(1000);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-4 md:p-6 shadow-xl dark:bg-gray-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white truncate">
            {mode === "create" ? "Create New API Key" : "Edit API Key"}
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-900 dark:hover:text-gray-300"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="key-name"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              API Key Name
            </label>
            <input
              id="key-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Production API Key"
              className={cn(
                "w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3",
                "bg-white text-gray-900 placeholder-gray-400 text-sm md:text-base",
                "focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500",
              )}
              required
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="key-limit"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Request Limit
            </label>
            <input
              id="key-limit"
              type="number"
              min="1"
              value={limit}
              onChange={(e) =>
                setLimit(Math.max(1, parseInt(e.target.value) || 1))
              }
              placeholder="e.g., 1000"
              className={cn(
                "w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3",
                "bg-white text-gray-900 placeholder-gray-400 text-sm md:text-base",
                "focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20",
                "dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500",
              )}
              required
              disabled={isSubmitting}
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Maximum number of requests allowed for this API key
            </p>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className={cn(
                "rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium w-full sm:w-auto",
                "text-gray-700 transition-colors hover:bg-gray-50",
                "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || limit < 1}
              className={cn(
                "rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white w-full sm:w-auto",
                "transition-colors hover:bg-purple-700",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                  ? "Create Key"
                  : "Update Key"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
