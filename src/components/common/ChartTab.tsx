import { cn } from "@/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

const ChartTab: React.FC = () => {
  const t = useTranslations("ecommerce.statistics");
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree"
  >("optionOne");

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree") =>
    selected === option
      ? "shadow-theme-xs text-gray-dark dark:text-light-accent bg-light-accent dark:bg-gray-dark"
      : "text-gray dark:text-gray-light";

  return (
    <div className="flex max-h-10 items-center gap-0.5 rounded-lg bg-light p-0.5 dark:bg-gray-dark">
      <button
        onClick={() => setSelected("optionOne")}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-dark dark:hover:text-light-accent ${getButtonClass(
          "optionOne",
        )}`}
      >
        {t("monthly")}
      </button>

      <button
        onClick={() => setSelected("optionTwo")}
        className={cn(
          "w-full rounded-md px-3 py-1.5 text-theme-sm font-medium hover:text-gray-dark rtl:min-w-20 dark:hover:text-light-accent",
          getButtonClass("optionTwo"),
        )}
      >
        {t("quarterly")}
      </button>

      <button
        onClick={() => setSelected("optionThree")}
        className={`w-full rounded-md px-3 py-2 text-theme-sm font-medium hover:text-gray-dark dark:hover:text-light-accent ${getButtonClass(
          "optionThree",
        )}`}
      >
        {t("annually")}
      </button>
    </div>
  );
};

export default ChartTab;
