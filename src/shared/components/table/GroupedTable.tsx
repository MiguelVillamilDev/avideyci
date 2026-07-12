import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EditButton from '../common/EditButton';

export interface GroupedRow {
  id: string;
  parentLabel: string;
  parentColumns?: string[];
  children: string[][];
}

interface GroupedTableProps {
  title?: string;
  actions?: ReactNode;
  parentLabel: string;
  parentColumnLabels?: string[];
  columns: string[];
  groups: GroupedRow[];
  onEditParent?: (groupId: string) => void;
  onDeleteParent?: (groupId: string) => void;
  onAddChild?: (groupId: string) => void;
  onEditChild?: (groupId: string, childIndex: number) => void;
  onDeleteChild?: (groupId: string, childIndex: number) => void;
}

export default function GroupedTable({
  title,
  actions,
  parentLabel,
  parentColumnLabels = [],
  columns,
  groups,
  onEditParent,
  onDeleteParent,
  onAddChild,
  onEditChild,
  onDeleteChild,
}: GroupedTableProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const showParentActions = Boolean(onEditParent || onDeleteParent || onAddChild);
  const showChildActions = Boolean(onEditChild || onDeleteChild);
  const totalCols = 2 + parentColumnLabels.length + (showParentActions ? 1 : 0);

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

      {actions && <div className="mb-4 flex justify-start">{actions}</div>}

      <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-[whitesmoke] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100">
                <th className="w-10 px-4 py-3"></th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {parentLabel}
                </th>
                {parentColumnLabels.map((label) => (
                  <th
                    key={label}
                    className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {label}
                  </th>
                ))}
                {showParentActions && (
                  <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {groups.length === 0 ? (
                <tr>
                  <td colSpan={totalCols} className="px-4 py-8 text-center text-sm text-slate-400">
                    No hay datos para mostrar.
                  </td>
                </tr>
              ) : (
                groups.map((group) => {
                  const isOpen = openIds.has(group.id);
                  return (
                    <>
                      <tr
                        key={group.id}
                        className="cursor-pointer transition-colors hover:bg-slate-200/40"
                      >
                        <td className="px-4 py-3 text-center" onClick={() => toggle(group.id)}>
                          <motion.i
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            transition={{ duration: 0.15 }}
                            className="fa-solid fa-chevron-right text-slate-400 text-xs inline-block"
                          />
                        </td>
                        <td className="px-4 py-3 text-left" onClick={() => toggle(group.id)}>
                          <span className="font-semibold text-slate-900">{group.parentLabel}</span>
                        </td>
                        {(group.parentColumns ?? []).map((value, idx) => (
                          <td
                            key={idx}
                            className="px-4 py-3 text-center text-slate-600"
                            onClick={() => toggle(group.id)}
                          >
                            {value}
                          </td>
                        ))}
                        {showParentActions && (
                          <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-2">
                              {onAddChild && (
                                <EditButton icon="fa-plus" variant="edit" onClick={() => onAddChild(group.id)} />
                              )}
                              {onEditParent && (
                                <EditButton icon="fa-pen-to-square" variant="edit" onClick={() => onEditParent(group.id)} />
                              )}
                              {onDeleteParent && (
                                <EditButton icon="fa-trash" variant="delete" onClick={() => onDeleteParent(group.id)} />
                              )}
                            </div>
                          </td>
                        )}
                      </tr>

                      <tr>
                        <td colSpan={totalCols} className="p-0 border-none">
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className="overflow-hidden bg-white"
                              >
                                <table className="w-full border-collapse text-sm">
                                  <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50">
                                      <th className="w-10 px-4 py-2"></th>
                                      {columns.map((col) => (
                                        <th
                                          key={col}
                                          className="px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                                        >
                                          {col}
                                        </th>
                                      ))}
                                      {showChildActions && (
                                        <th className="px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                          Acciones
                                        </th>
                                      )}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                    {group.children.map((row, rowIndex) => (
                                      <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-2"></td>
                                        {row.map((cell, cellIndex) => (
                                          <td
                                            key={cellIndex}
                                            className="px-4 py-2 text-center text-slate-600 first:font-medium first:text-slate-800"
                                          >
                                            {cell}
                                          </td>
                                        ))}
                                        {showChildActions && (
                                          <td className="px-4 py-2">
                                            <div className="flex items-center justify-center gap-2">
                                              {onEditChild && (
                                                <EditButton
                                                  icon="fa-pen-to-square"
                                                  variant="edit"
                                                  onClick={() => onEditChild(group.id, rowIndex)}
                                                />
                                              )}
                                              {onDeleteChild && (
                                                <EditButton
                                                  icon="fa-trash"
                                                  variant="delete"
                                                  onClick={() => onDeleteChild(group.id, rowIndex)}
                                                />
                                              )}
                                            </div>
                                          </td>
                                        )}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </td>
                      </tr>
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}