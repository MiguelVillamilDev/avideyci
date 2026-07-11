import List from "../common/List"
import NavItem from "./NavItem"
import { NavItems } from "../../types/nav.types";

export default function NavBar({ isOpen }: { isOpen: boolean }) {
    const user = { role: 'admin' };
    const filteredItems = NavItems.filter(item => {
        if (!item.roles || item.roles.length === 0) return true;
        return user && item.roles.includes(user.role);
    });

    return (
        <aside
            className={`
                h-screen sticky top-0 shrink-0
                bg-white text-gray-800
                border-r border-gray-200
                flex flex-col
                transition-all duration-300 ease-in-out
                ${isOpen ? 'w-64' : 'w-20'}
                px-2 py-4
            `}
        >
            <div className="flex items-center gap-3 px-2 mb-8 h-12">
                <img src="../public/logo.png" alt="AviDeyci" className="w-11 h-11 shrink-0 object-contain" />
                {isOpen && (
                    <span
                        className="whitespace-nowrap text-[22px] font-bold text-gray-900 tracking-tight"
                        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                        AviDeyci
                    </span>
                )}
            </div>

            <List className="w-full flex flex-col gap-1">
                {filteredItems.map((item) => (
                    <NavItem {...item} isOpen={isOpen} key={item.key} />
                ))}
            </List>
        </aside>
    );
}