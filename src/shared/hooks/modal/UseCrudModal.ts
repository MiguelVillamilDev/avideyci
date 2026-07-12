import { useState } from "react";

export function useCrudModal<T>() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<T | null>(null);

    const openCreate = () => {
        setEditingItem(null);
        setIsOpen(true);
    };

    const openEdit = (item: T) => {
        setEditingItem(item);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setEditingItem(null);
    };

    return { isOpen, editingItem, isEditing: editingItem !== null, openCreate, openEdit, close };
}