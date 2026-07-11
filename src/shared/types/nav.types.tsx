import ROUTES from "../constants/routes"

export const NavItemCurrentStyles = 'bg-gray-100'
export const NavItemStyles = `
        flex
        px-3
        h-11
        justify-start
        gap-3
        items-center
        w-full
        rounded-lg
        transition-colors
        transition-transform
        ease-in-out
        duration-300
        text-gray-800
    `;
export const NavItemHoverStyles = `hover:bg-gray-100`
export const NavItemTransitionStyle = 'transition-all duration-300 ease-in-out'

export type NavItemConfig = {
    key: string,
    icon: string,
    title: string,
    routeName?: string | string[],
    href?: string,
    roles?: string[],
    childrenNav?: NavItemConfig[]
}

export const NavItems: NavItemConfig[] = [
    {
        key: 'home',
        title: 'Home',
        icon: 'fa-solid fa-house',
        routeName: ROUTES.home,
        href: ROUTES.home,
    },
    {
        key: 'granjas',
        title: 'Granjas',
        icon: 'fa-solid fa-warehouse',
        routeName: ROUTES.granjas,
        href: ROUTES.granjas,
    },
    {
        key: 'pesos',
        title: 'Pesos',
        icon: 'fa-solid fa-weight-scale',
        routeName: ROUTES.pesos,
        href: ROUTES.pesos,
    },
    {
        key: 'sacrificio',
        title: 'Sacrificio',
        icon: 'fa-solid fa-drumstick-bite',
        routeName: ROUTES.sacrificio,
        href: ROUTES.sacrificio,
    },
    {
        key: 'nacimientos',
        title: 'Nacimientos',
        icon: 'fa-solid fa-egg',
        routeName: ROUTES.nacimientos,
        href: ROUTES.nacimientos,
    }
]

export type NavItemProps = {
    icon: string,
    routeName?: string | string[]
    isOpen?: boolean
    CurrentStyles?: string
    ItemStyles?: string
    ItemHoverStyles?: string
    TransitionStyle?: string
    title: string
    childrenNav?: Array<NavItemConfig>
    href?: string
    className?: string
}