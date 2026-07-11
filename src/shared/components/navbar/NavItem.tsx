import TransitionMotion from "../transitions/TransitionMotion"
import Title from "../common/Title"
import NavItemGroup from "./NavItemGroup";
import { isRouteActive } from "../../helpers/nav/nav.helper";
import { Link } from "react-router-dom";
import { NavItemCurrentStyles, NavItemHoverStyles, NavItemStyles, NavItemTransitionStyle } from "../../types/nav.types";
import { type NavItemProps } from "../../types/nav.types";

export default function NavItem({
    icon = '',
    routeName='',
    isOpen = false,
    title = '',
    childrenNav = [],
    href = '#',
    className = ''
}: NavItemProps
) {
  return childrenNav.length <= 0 ? (
     <li className={`flex w-full ${className}`}>
        <Link
        to={href}
        className={`
        ${NavItemStyles}
        ${isRouteActive(routeName)?
          NavItemCurrentStyles
          : NavItemHoverStyles  }
        `}>
                <i className={`${icon} text-gray-500 text-base w-5 text-center ${NavItemTransitionStyle}`}></i>
                <TransitionMotion initial={{opacity: 0, x: -40}} active={isOpen}>
                    <Title as="span" size="sm" title={title} className="whitespace-nowrap font-medium" />
                </TransitionMotion>
        </Link>
    </li>
  ):(
    <NavItemGroup
      CurrentStyles={NavItemCurrentStyles}
      routeName={routeName}
      ItemStyles={NavItemStyles}
      ItemHoverStyles={NavItemHoverStyles}
      TransitionStyle={NavItemTransitionStyle}
      isOpen={isOpen}
      icon={icon}
      title={title}
      childrenNav={childrenNav}
     />
  )
}