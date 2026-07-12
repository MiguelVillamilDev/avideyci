import { type ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FormField {
    name: string
    label: string
    type: "text" | "number" | "email" | "date" | "select" | "textarea"
    placeholder?: string
    required?: boolean
    options?: { label: string; value: string }[]
}

export interface ModalProps {
    isOpen: boolean
    title: string
    fields: FormField[]
    initialData?: Record<string, string>
    onClose: () => void
    onSubmit: (data: Record<string, string>) => void
    submitLabel?: string
    columns?: 1 | 2
    children?: ReactNode
}

export default function Modal({
    isOpen,
    title,
    fields,
    initialData,
    onClose,
    onSubmit,
    submitLabel = "Guardar",
    columns = 1,
}: ModalProps) {

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        onSubmit(data);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                    onClick={onClose}
                >
                    <motion.div
                        key={initialData ? JSON.stringify(initialData) : "new"}
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="
                            w-full max-w-lg
                            max-h-[85vh]
                            bg-white
                            rounded-2xl
                            shadow-xl
                            border border-gray-100
                            overflow-hidden
                            flex flex-col
                        "
                    >
                        <div className="relative flex items-center justify-center px-6 py-4 border-b border-gray-100 shrink-0">
                            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                            <button
                                onClick={onClose}
                                className="
                                    absolute right-4
                                    w-8 h-8 flex items-center justify-center
                                    rounded-full text-gray-400
                                    hover:bg-gray-100 hover:text-gray-600
                                    transition-colors
                                "
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
                            <div
                                className={`
                                    px-6 py-5
                                    overflow-y-auto
                                    grid gap-4
                                    ${columns === 2 ? 'grid-cols-2' : 'grid-cols-1'}
                                `}
                            >
                                {fields.map((field) => (
                                    <div
                                        key={field.name}
                                        className={`flex flex-col gap-1.5 text-left ${field.type === 'textarea' ? 'col-span-full' : ''}`}
                                    >
                                        <label
                                            htmlFor={field.name}
                                            className="text-xs font-medium text-gray-600"
                                        >
                                            {field.label}
                                            {field.required && <span className="text-red-500 ml-0.5">*</span>}
                                        </label>

                                        {field.type === "select" ? (
                                            <select
                                                id={field.name}
                                                name={field.name}
                                                required={field.required}
                                                defaultValue={initialData?.[field.name] ?? ""}
                                                className="
                                                    border border-gray-200 rounded-lg
                                                    px-3 py-2 text-sm text-gray-800
                                                    focus:outline-none focus:ring-2 focus:ring-[var(--accent-border)]
                                                    transition-shadow
                                                "
                                            >
                                                <option value="">Seleccionar...</option>
                                                {field.options?.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : field.type === "textarea" ? (
                                            <textarea
                                                id={field.name}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                defaultValue={initialData?.[field.name] ?? ""}
                                                rows={3}
                                                className="
                                                    border border-gray-200 rounded-lg
                                                    px-3 py-2 text-sm text-gray-800
                                                    resize-none
                                                    focus:outline-none focus:ring-2 focus:ring-[var(--accent-border)]
                                                    transition-shadow
                                                "
                                            />
                                        ) : (
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                required={field.required}
                                                defaultValue={initialData?.[field.name] ?? ""}
                                                className="
                                                    border border-gray-200 rounded-lg
                                                    px-3 py-2 text-sm text-gray-800
                                                    focus:outline-none focus:ring-2 focus:ring-[var(--accent-border)]
                                                    transition-shadow
                                                "
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 shrink-0">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="
                                        px-4 py-2 text-sm font-medium text-gray-600
                                        rounded-lg hover:bg-gray-100
                                        transition-colors
                                    "
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="
                                        px-4 py-2 text-sm font-semibold text-green-800
                                        bg-[var(--accent-green-bg)] rounded-lg
                                        hover:brightness-110 active:scale-95
                                        transition-all
                                    "
                                >
                                    {submitLabel}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}