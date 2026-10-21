import { cn } from "@/utils";
import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-light bg-light-accent dark:border-gray-dark dark:bg-light-accent/3",
        className,
      )}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-dark dark:text-light-accent/90">
          {title}
        </h3>
        {desc && (
          <p className="mt-1 text-sm text-gray dark:text-gray-light">
            {desc}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="border-t border-gray-light p-4 sm:p-6 dark:border-gray-dark">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
