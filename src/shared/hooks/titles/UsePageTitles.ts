// src/hooks/usePageTitle.ts
import { useLocation } from "react-router-dom";
import { PAGE_TITLES } from "../../constants/pageTitles";

export default function usePageTitle() {
  const { pathname } = useLocation();
  return PAGE_TITLES[pathname] ?? "AviDeyci";
}