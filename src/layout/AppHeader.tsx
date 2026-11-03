"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import { Link, useRouter } from "@/i18n/navigation";
import { useHeadquarterStore } from "@/store/useHeadquarterStore";
import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const AppHeader: React.FC = () => {
  // TRADUCCIONES
  const t = useTranslations("header");

  // HOOKS-STATES---
  const inputRef = useRef<HTMLInputElement>(null);
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const Navigate = useRouter();


  // ZUSTAN
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { currentHeadquarter, setShowOverlay } = useHeadquarterStore();

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


  // EFFECTS
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


  // useEffect(() => {
  //   if (!currentHeadquarter?.id || currentHeadquarter?.id == '') {
  //     Navigate.push('/signing');
  //   }
  // }, [currentHeadquarter]);

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

        </div>
      </div>

      {/* Lado derecho: Badges, Acciones y Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Badge de Sede Hospitalaria */}

        <div className="hidden xl:flex items-center gap-2 rounded-full border border-gray-light bg-light px-3.5 py-1.5 text-xs text-gray-dark dark:border-gray/30 dark:bg-black-light dark:text-gray-light">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="font-semibold text-gray-dark dark:text-light">{currentHeadquarter?.name}</span>
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
