"use client";

import GridShape from "@/components/common/GridShape";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
      <GridShape />
      <div className="mx-auto w-full max-w-60.5 text-center sm:max-w-118">
        <h1 className="mb-8 text-title-md font-bold text-gray-dark xl:text-title-2xl dark:text-light-accent/90">
          {t("error")}
        </h1>

        <Image
          src="/images/error/404.svg"
          alt="404"
          className="dark:hidden"
          width={472}
          height={152}
        />
        <Image
          src="/images/error/404-dark.svg"
          alt="404"
          className="hidden dark:block"
          width={472}
          height={152}
        />

        <p className="mt-10 mb-6 text-base text-gray-dark sm:text-lg dark:text-gray-light">
          {t("message")}
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border border-gray-light bg-light-accent px-5 py-3.5 text-sm font-medium text-gray-dark shadow-theme-xs hover:bg-light hover:text-gray-dark dark:border-gray-dark dark:bg-gray-dark dark:text-gray-light dark:hover:bg-light-accent/3 dark:hover:text-gray-light"
        >
          {t("backHome")}
        </Link>
      </div>
      {/* <!-- Footer --> */}
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-gray dark:text-gray-light">
        &copy; {new Date().getFullYear()} - TailAdmin
      </p>
    </div>
  );
}
