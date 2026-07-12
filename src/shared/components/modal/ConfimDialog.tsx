import { motion, AnimatePresence } from "framer-motion";

export interface ConfirmDialogProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmDialog({
    isOpen,
    title = "¿Eliminar registro?",
    message = "Esta acción no se puede deshacer.",
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-100 p-6 text-center"
                    >
                        <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-red-50 text-red-500">
                            <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
                        <p className="text-sm text-gray-500 mb-6">{message}</p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:brightness-110 active:scale-95 transition-all"
                            >
                                Eliminar
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}