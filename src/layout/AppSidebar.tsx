"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSidebar } from "../context/SidebarContext";
import {
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  PlugInIcon,
  UserCircleIcon,
} from "../icons/index";

type NavItem = {
  key: string;
  icon: React.ReactNode;
  path?: string;
  new?: boolean;
  target?: string;
  subItems?: {
    key: string;
    path: string;
    pro?: boolean;
    new?: boolean;
    target?: string;
  }[];
};

const adminItems: NavItem[] = [
  {
    icon: <GridIcon />,
    key: "dashboard",
    path: "/admin"
  },
  {
    icon: <UserCircleIcon />,
    key: "profesionals",
    path: "/admin/profesionals"
  }
];

const sessionItems: NavItem[] = [
  {
    icon: <PlugInIcon />,
    key: "session",
    subItems: [
      { key: "signIn", path: "/signin", pro: false },
      { key: "signUp", path: "/signup", pro: false },
    ],
  },
];

type MenuType = "main" | "session";
const MenyTypesValues: MenuType[] = ["main", "session"];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const t = useTranslations("sidebar");

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: MenuType,
  ) => (
    <ul className="flex flex-col gap-1.5">
      {navItems.map((nav, index) => (
        <li key={nav.key}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer",
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "bg-brand/10 text-brand dark:bg-brand/15 dark:text-brand-light font-semibold"
                  : "text-gray dark:text-gray-light hover:text-gray-dark dark:hover:text-light hover:bg-light dark:hover:bg-light-accent/5",
                !isExpanded && !isHovered
                  ? "lg:justify-center px-0"
                  : "lg:justify-start",
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center transition-colors",
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "text-brand dark:text-brand-light"
                    : "text-gray dark:text-gray-light group-hover:text-gray-dark dark:group-hover:text-light",
                )}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="truncate">{t(`items.${nav.key}`)}</span>
              )}
              {nav.new && (isExpanded || isHovered || isMobileOpen) && (
                <span className="ms-auto rounded-full bg-brand/20 px-2 py-0.5 text-2xs font-semibold text-brand dark:text-brand-light">
                  {t("badges.new")}
                </span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={cn(
                    "ms-auto h-4 w-4 shrink-0 transition-transform duration-200 text-gray dark:text-gray-light",
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "rotate-180 text-brand dark:text-brand-light"
                      : "",
                  )}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                target={nav.target}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive(nav.path)
                    ? "bg-brand/10 text-brand dark:bg-brand/15 dark:text-brand-light font-semibold shadow-theme-xs"
                    : "text-gray dark:text-gray-light hover:text-gray-dark dark:hover:text-light hover:bg-light dark:hover:bg-light-accent/5",
                  !isExpanded && !isHovered
                    ? "lg:justify-center px-0"
                    : "lg:justify-start",
                )}
              >
                {/* Active Indicator Line */}
                {isActive(nav.path) && (isExpanded || isHovered || isMobileOpen) && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-brand" />
                )}
                <span
                  className={cn(
                    "flex h-5 w-6 shrink-0 items-center justify-center transition-colors",
                    isActive(nav.path)
                      ? "text-brand dark:text-brand-light"
                      : "text-gray dark:text-gray-light group-hover:text-gray-dark dark:group-hover:text-light",
                  )}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="truncate">
                    {t(`items.${nav.key}`)}
                  </span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="ms-4 my-1 space-y-1 border-s border-gray-light dark:border-gray/30 ps-3">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.key}>
                    <Link
                      href={subItem.path}
                      target={subItem.target}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                        isActive(subItem.path)
                          ? "bg-brand/10 text-brand dark:bg-brand/15 dark:text-brand-light font-semibold"
                          : "text-gray dark:text-gray-light hover:text-gray-dark dark:hover:text-light hover:bg-light dark:hover:bg-light-accent/5",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors",
                          isActive(subItem.path)
                            ? "bg-brand dark:bg-brand-light"
                            : "bg-gray-light dark:bg-gray/50",
                        )}
                      />
                      <span className="truncate">{t(`items.${subItem.key}`)}</span>
                      <span className="ms-auto flex items-center gap-1">
                        {subItem.new && (
                          <span className="rounded-full bg-brand/20 px-1.5 py-0.5 text-2xs font-semibold text-brand dark:text-brand-light">
                            {t("badges.new")}
                          </span>
                        )}
                        {subItem.pro && (
                          <span className="rounded-full bg-orange/20 px-1.5 py-0.5 text-2xs font-semibold text-orange">
                            {t("badges.pro")}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: MenuType;
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    MenyTypesValues.forEach((menuType) => {
      const items = menuType === "main" ? adminItems : sessionItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number,
    menuType: MenuType,
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 flex h-screen flex-col bg-light-accent dark:bg-gray-dark border-r border-gray-light dark:border-gray/30 transition-all duration-300 ease-in-out rtl:right-0 rtl:left-auto rtl:border-r-0 rtl:border-l shadow-theme-xs",
        isExpanded || isMobileOpen ? "w-72" : isHovered ? "w-72 shadow-theme-xl" : "w-20",
        isMobileOpen
          ? "translate-x-0"
          : "-translate-x-full rtl:translate-x-full",
        "lg:translate-x-0 lg:rtl:translate-x-0",
      )}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Brand Header */}
      <div
        className={cn(
          "flex h-18 shrink-0 items-center border-b border-gray-light dark:border-gray/30 px-5",
          !isExpanded && !isHovered ? "lg:justify-center px-0" : "justify-start",
        )}
      >
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-light shadow-theme-xs transition-transform group-hover:scale-105">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-bold tracking-tight text-gray-dark dark:text-light leading-tight">
                PMS Clínica
              </span>
              <span className="text-2xs font-semibold text-brand dark:text-brand-light">
                Portal Hospitalario
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation List */}
      <div className="no-scrollbar flex flex-1 flex-col overflow-y-auto p-4 duration-300 ease-linear">
        <nav className="space-y-6">
          <div>
            <h2
              className={cn(
                "mb-2.5 px-3 text-xs italic uppercase tracking-wider text-gray-dark/70 dark:text-light/50",
                !isExpanded && !isHovered
                  ? "lg:flex lg:justify-center px-0"
                  : "flex justify-start",
              )}
            >
              {isExpanded || isHovered || isMobileOpen ? (
                t("groups.admin")
              ) : (
                <span className="h-1 w-3 rounded-full bg-gray-light dark:bg-gray/40" />
              )}
            </h2>
            {renderMenuItems(adminItems, "main")}
          </div>

          <div>
            <h2
              className={cn(
                "mb-2.5 px-3 text-xs italic uppercase tracking-wider text-gray-dark/70 dark:text-light/50",
                !isExpanded && !isHovered
                  ? "lg:flex lg:justify-center px-0"
                  : "flex justify-start",
              )}
            >
              {isExpanded || isHovered || isMobileOpen ? (
                t("groups.session")
              ) : (
                <span className="h-1 w-3 rounded-full bg-gray-light dark:bg-gray/40" />
              )}
            </h2>
            {renderMenuItems(sessionItems, "session")}
          </div>
        </nav>

        {/* Bottom System Status Badge */}
        {(isExpanded || isHovered || isMobileOpen) && (
          <div className="mt-auto pt-6 pb-6">
            <div className="rounded-2xl border border-gray-light dark:border-gray/30 bg-light/70 dark:bg-black/30 p-3.5">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-semibold text-gray-dark dark:text-light">
                  Sistema Hospitalario
                </span>
              </div>
              <p className="text-2xs text-theme-light-gray">
                Servidor Seguro &bull; v2.6
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
