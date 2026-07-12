import type { ReactNode } from 'react';
import EditButton from '../common/EditButton';

interface SimpleTableProps {
  title?: string;
  actions?: ReactNode;
  columns: string[];
  rows: string[][];
  onEdit?: (rowIndex: number) => void;
  onDelete?: (rowIndex: number) => void;
}

export default function SimpleTable({ title, actions, columns, rows, onEdit, onDelete }: SimpleTableProps) {
  const showActionsColumn = Boolean(onEdit || onDelete);

  return (
    <div className="mx-auto w-[80%]">
      {title && (
        <div style={{ marginBottom: '25px', marginTop: '25px' }}>
          <p
            className="text-center font-semibold text-[40px] text-black"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif', margin: 0 }}
          >
            {title}
          </p>
        </div>
      )}

      {actions && (
        <div className="mb-4 flex justify-start">
          {actions}
        </div>
      )}

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-[whitesmoke] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100">
                {columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 first:pl-5 last:pr-5"
                  >
                    {column}
                  </th>
                ))}
                {showActionsColumn && (
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (showActionsColumn ? 1 : 0)}
                    className="px-4 py-8 text-center text-sm text-slate-400"
                  >
                    No hay datos para mostrar.
                  </td>
                </tr>
              ) : (
                rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="transition-colors hover:bg-slate-200/40">
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 text-center text-slate-700 first:pl-5 first:font-medium first:text-slate-900 last:pr-5"
                      >
                        {cell}
                      </td>
                    ))}
                    {showActionsColumn && (
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {onEdit && (
                            <EditButton icon="fa-pen-to-square" variant="edit" onClick={() => onEdit(rowIndex)} />
                          )}
                          {onDelete && (
                            <EditButton icon="fa-trash" variant="delete" onClick={() => onDelete(rowIndex)} />
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}