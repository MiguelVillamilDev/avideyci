import { useLocation } from "react-router-dom";
import ROUTES from "../../constants/routes";

export function isRouteActive(
  routeName: string | string[] | undefined
): boolean {
  const { pathname } = useLocation();

  if (!routeName) return false;

  if (Array.isArray(routeName)) {
    return routeName.some((r) => pathname === r);
  }

  return pathname === routeName;
}