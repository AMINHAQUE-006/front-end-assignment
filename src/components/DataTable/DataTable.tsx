import  { useMemo, useState } from "react";
import type { Column } from "../../types/table";

type SortDirection = "asc" | "desc" | null;

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  multipleSelect?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  multipleSelect = true,
  onRowSelect,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const toggleSelect = (index: number) => {
    const next = new Set(selected);
    if (next.has(index)) next.delete(index);
    else {
      if (!multipleSelect) next.clear();
      next.add(index);
    }
    setSelected(next);
    onRowSelect?.(Array.from(next).map((i) => data[i]));
  };

  const toggleSelectAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set<number>(data.map((_, i) => i));
      setSelected(all);
      onRowSelect?.(data.slice());
    }
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    const idx = col.dataIndex as keyof T;
    const sorted = [...data].sort((a, b) => {
      const va = a[idx];
      const vb = b[idx];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number") {
        return va - vb;
      }
      return String(va).localeCompare(String(vb));
    });
    if (sortDir === "desc") sorted.reverse();
    return sorted;
  }, [data, sortKey, sortDir, columns]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey !== col.key) {
      setSortKey(col.key);
      setSortDir("asc");
    } else {
      setSortDir((prev) => (prev === "asc" ? "desc" : prev === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    }
  };

  return (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-4 py-2 text-left">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700"
              >
                <button
                  type="button"
                  className="flex items-center gap-2"
                  onClick={() => handleSort(col)}
                  aria-sort={
                    sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : "none"
                  }
                >
                  <span>{col.title}</span>
                  {col.sortable && (
                    <span className="text-xs opacity-60">
                      {sortKey === col.key ? (sortDir === "asc" ? "▲" : sortDir === "desc" ? "▼" : "↕") : "↕"}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center">
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => {
              // original index in data
              const originalIndex = data.indexOf(row);
              return (
                <tr key={idx} className={selected.has(originalIndex) ? "bg-blue-50" : ""}>
                  {selectable && (
                    <td className="px-4 py-2">
                      <input
                        aria-label={`Select row ${idx + 1}`}
                        type="checkbox"
                        checked={selected.has(originalIndex)}
                        onChange={() => toggleSelect(originalIndex)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-2 text-sm">
                      {String(row[col.dataIndex])}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
