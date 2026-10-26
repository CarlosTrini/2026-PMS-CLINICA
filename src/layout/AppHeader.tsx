"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import { Link } from "@/i18n/navigation";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AppHeader: React.FC = () => {
  const t = useTranslations("header");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-18 w-full items-center justify-between border-b border-gray-light bg-light-accent/95 px-4 backdrop-blur-md sm:px-6 dark:border-gray/30 dark:bg-gray-dark/95">
      {/* Lado izquierdo: Botón colapsar + Barra de Búsqueda */}
      <div className="flex items-center gap-3 lg:gap-4 flex-1">
        {/* Botón Toggle del Sidebar */}
        <button
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-light bg-light text-gray transition-colors hover:bg-gray-light/60 hover:text-gray-dark dark:border-gray/30 dark:bg-black-light dark:text-gray-light dark:hover:bg-gray/20 dark:hover:text-light cursor-pointer",
            isMobileOpen ? "bg-light dark:bg-gray/20" : "",
          )}
          onClick={handleToggle}
          aria-label={t("toggleSidebar")}
        >
          {isMobileOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 rtl:-scale-x-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Logo Móvil */}
        <Link href="/" className="lg:hidden flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-light">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="font-bold text-sm text-gray-dark dark:text-light">PMS Clínica</span>
        </Link>

        {/* Barra de Búsqueda de Escritorio */}
        <div className="hidden lg:block w-full max-w-md">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3.5 text-gray/50 dark:text-gray-light/40">
                <svg
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                  />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder={t("searchPlaceholder")}
                className="h-10 w-full rounded-xl border border-gray-light bg-light ps-10 pe-14 text-sm text-gray-dark shadow-theme-xs placeholder:text-gray/50 transition focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20 dark:border-gray/30 dark:bg-black-light dark:text-light dark:placeholder:text-gray-light/40 dark:focus:border-brand-dark"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pe-3">
                <kbd className="hidden sm:inline-flex items-center rounded border border-gray-light bg-light-accent px-1.5 py-0.5 text-2xs font-medium text-gray dark:border-gray/40 dark:bg-gray-dark dark:text-gray-light">
                  ⌘K
                </kbd>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Lado derecho: Badges, Acciones y Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Badge de Sede Hospitalaria */}
        <div className="hidden xl:flex items-center gap-2 rounded-full border border-gray-light bg-light px-3.5 py-1.5 text-xs text-gray-dark dark:border-gray/30 dark:bg-black-light dark:text-gray-light">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="font-semibold text-gray-dark dark:text-light">Sede Central</span>
          <span className="text-gray/60 dark:text-gray-light/60">Turno Activo</span>
        </div>

        {/* Alternador de Modo Claro/Oscuro */}
        <ThemeToggleButton />

        {/* Notificaciones */}
        <NotificationDropdown />

        {/* Separador vertical */}
        <div className="hidden sm:block h-7 w-px bg-gray-light dark:bg-gray/30 mx-1" />

        {/* Perfil de Usuario */}
        <UserDropdown />
      </div>
    </header>
  );
};

export default AppHeader;
