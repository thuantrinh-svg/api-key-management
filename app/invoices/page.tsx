"use client";

import { useState } from "react";
import { FileCheck, Download, Eye, CreditCard, Calendar } from "lucide-react";

type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  plan: string;
  period: string;
};

export default function Invoices() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      date: "2024-12-01",
      amount: 49.99,
      status: "paid",
      plan: "Researcher Plan",
      period: "December 2024",
    },
    {
      id: "2",
      invoiceNumber: "INV-2024-002",
      date: "2024-11-01",
      amount: 49.99,
      status: "paid",
      plan: "Researcher Plan",
      period: "November 2024",
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003",
      date: "2024-10-01",
      amount: 49.99,
      status: "paid",
      plan: "Researcher Plan",
      period: "October 2024",
    },
    {
      id: "4",
      invoiceNumber: "INV-2024-004",
      date: "2024-09-01",
      amount: 29.99,
      status: "paid",
      plan: "Starter Plan",
      period: "September 2024",
    },
  ];

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400";
    }
  };

  const getStatusText = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending":
        return "Pending";
      case "overdue":
        return "Overdue";
    }
  };

  const filteredInvoices =
    selectedFilter === "all"
      ? invoices
      : invoices.filter((invoice) => invoice.status === selectedFilter);

  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FileCheck className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Invoices
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            View and download your billing invoices and payment history.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <CreditCard className="h-4 w-4" />
              Total Paid
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              ${totalPaid.toFixed(2)}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileCheck className="h-4 w-4" />
              Total Invoices
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {invoices.length}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="h-4 w-4" />
              Current Plan
            </div>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              Researcher
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by status:
          </span>
          <div className="flex gap-2">
            {["all", "paid", "pending", "overdue"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedFilter === filter
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Invoices Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {invoice.plan}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {invoice.period}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">
                    ${invoice.amount.toFixed(2)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {getStatusText(invoice.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="mt-8 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <FileCheck className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              No invoices found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No invoices match the selected filter.
            </p>
          </div>
        )}

        {/* Payment Method */}
        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Payment Method
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  •••• •••• •••• 4242
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Expires 12/2025
                </div>
              </div>
            </div>
            <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

