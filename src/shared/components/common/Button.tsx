export interface ButtonProps {
    title: string
    table: string
    onClick?: (table: string) => void
}

export default function Button({ title, table, onClick }: ButtonProps) {
    return (
        <button
            onClick={() => onClick?.(table)}
            className="
                inline-flex items-center gap-2
                px-3 py-1.5
                w-fit
                rounded-lg
                bg-[var(--accent-green-bg)]
                text-[var(--accent-green-text)]
                text-sm font-semibold
                shadow-sm
                transition-all duration-200 ease-in-out
                hover:brightness-105 hover:shadow-md
                active:scale-95
                cursor-pointer
            "
        >
            <i className="fa-solid fa-plus text-xs"></i>
            {title}
        </button>
    )
}