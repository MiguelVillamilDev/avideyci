export interface EditButtonProps {
    icon: string;
    variant?: "edit" | "delete";
    onClick: () => void;
}

const variantStyles = {
    edit: "bg-[var(--accent-yellow-bg)] text-[var(--accent-yellow-text)] hover:bg-[var(--accent-yellow)] hover:text-white",
    delete: "bg-red-50 text-red-600 hover:bg-red-500 hover:text-white",
};

export default function EditButton({ icon, variant = "edit", onClick }: EditButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center rounded-lg p-2 transition-all duration-200 ease-in-out ${variantStyles[variant]}`}
        >
            <i className={`fa-solid ${icon} text-sm`}></i>
        </button>
    );
}