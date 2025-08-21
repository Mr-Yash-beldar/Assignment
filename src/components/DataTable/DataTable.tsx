import React, { useState } from "react";
import { cn } from "../../lib/cn";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
}

function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.dataIndex) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(col.dataIndex);
      setSortOrder("asc");
    }
  };

  let displayed = [...data];
  if (sortKey) {
    displayed.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va == null || vb == null) return 0;
      if (va < vb) return sortOrder === "asc" ? -1 : 1;
      if (va > vb) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const toggleRow = (idx: number) => {
    if (!selectable) return;
    const copy = new Set(selectedRows);
    if (copy.has(idx)) copy.delete(idx);
    else copy.add(idx);
    setSelectedRows(copy);
    if (onRowSelect) {
      onRowSelect(displayed.filter((_, i) => copy.has(i)));
    }
  };

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {selectable && <th className="p-2 text-left"></th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "p-2 font-semibold text-left cursor-pointer select-none",
                  col.sortable && "hover:underline"
                )}
                onClick={() => toggleSort(col)}
                scope="col"
              >
                {col.title}
                {sortKey === col.dataIndex && (
                  <span className="ml-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-4 text-center"
              >
                Loading...
              </td>
            </tr>
          ) : displayed.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="p-4 text-center"
              >
                No data available
              </td>
            </tr>
          ) : (
            displayed.map((row, i) => (
              <tr
                key={(row.id as string) ?? i}
                className={cn(
                  "border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900",
                  selectable &&
                    selectedRows.has(i) &&
                    "bg-sky-50 dark:bg-sky-900/40"
                )}
              >
                {selectable && (
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(i)}
                      onChange={() => toggleRow(i)}
                      aria-label={`Select row ${i + 1}`}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="p-2">
                    {String(row[col.dataIndex] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
