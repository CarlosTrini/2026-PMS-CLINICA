"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "@/i18n/navigation";

export type AlertPosition =
  | "top-center"
  | "top-left"
  | "top-right"
  | "bottom-center"
  | "botton-center"
  | "bottom-left"
  | "bottom-right";

export interface AlertProps {
  variant: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  showLink?: boolean;
  linkHref?: string;
  linkText?: string;
  position?: AlertPosition;
  timer?: number | false;
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
}

const positionClasses: Record<AlertPosition, string> = {
  "top-center": "top-5 left-1/2 -translate-x-1/2",
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  "bottom-center": "bottom-5 left-1/2 -translate-x-1/2",
  "botton-center": "bottom-5 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
};

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  message,
  showLink = false,
  linkHref = "#",
  linkText = "Learn more",
  position = "top-right",
  timer = 3000,
  showClose = true,
  onClose,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    setIsVisible(true);
    setIsLeaving(false);

    if (timer === false || typeof timer !== "number" || timer <= 0) {
      return;
    }

    timerRef.current = setTimeout(() => {
      handleClose();
    }, timer);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [timer, title, message, handleClose]);

  if (!isVisible) {
    return null;
  }

  const variantClasses = {
    success: {
      container:
        "border-success/30 bg-light-accent dark:border-success-dark/40 dark:bg-gray-dark",
      iconWrapper:
        "bg-success-light/20 text-success dark:bg-success-dark/25 dark:text-success-light",
    },
    error: {
      container:
        "border-error/30 bg-light-accent dark:border-error-dark/40 dark:bg-gray-dark",
      iconWrapper:
        "bg-error-light/20 text-error dark:bg-error-dark/25 dark:text-error-light",
    },
    warning: {
      container:
        "border-warning/30 bg-light-accent dark:border-warning-dark/40 dark:bg-gray-dark",
      iconWrapper:
        "bg-warning-light/20 text-warning dark:bg-warning-dark/25 dark:text-warning-light",
    },
    info: {
      container:
        "border-blue-light/30 bg-light-accent dark:border-blue-light-dark/40 dark:bg-gray-dark",
      iconWrapper:
        "bg-blue-light-light/20 text-blue-light dark:bg-blue-light-dark/25 dark:text-blue-light-light",
    },
  };

  const icons = {
    success: (
      <svg
        className="size-5 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.70186 12.0001C3.70186 7.41711 7.41711 3.70186 12.0001 3.70186C16.5831 3.70186 20.2984 7.41711 20.2984 12.0001C20.2984 16.5831 16.5831 20.2984 12.0001 20.2984C7.41711 20.2984 3.70186 16.5831 3.70186 12.0001ZM12.0001 1.90186C6.423 1.90186 1.90186 6.423 1.90186 12.0001C1.90186 17.5772 6.423 22.0984 12.0001 22.0984C17.5772 22.0984 22.0984 17.5772 22.0984 12.0001C22.0984 6.423 17.5772 1.90186 12.0001 1.90186ZM15.6197 10.7395C15.9712 10.388 15.9712 9.81819 15.6197 9.46672C15.2683 9.11525 14.6984 9.11525 14.347 9.46672L11.1894 12.6243L9.6533 11.0883C9.30183 10.7368 8.73198 10.7368 8.38051 11.0883C8.02904 11.4397 8.02904 12.0096 8.38051 12.3611L10.553 14.5335C10.7217 14.7023 10.9507 14.7971 11.1894 14.7971C11.428 14.7971 11.657 14.7023 11.8257 14.5335L15.6197 10.7395Z"
        />
      </svg>
    ),
    error: (
      <svg
        className="size-5 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20.3499 12.0004C20.3499 16.612 16.6115 20.3504 11.9999 20.3504C7.38832 20.3504 3.6499 16.612 3.6499 12.0004C3.6499 7.38881 7.38833 3.65039 11.9999 3.65039C16.6115 3.65039 20.3499 7.38881 20.3499 12.0004ZM11.9999 22.1504C17.6056 22.1504 22.1499 17.6061 22.1499 12.0004C22.1499 6.3947 17.6056 1.85039 11.9999 1.85039C6.39421 1.85039 1.8499 6.3947 1.8499 12.0004C1.8499 17.6061 6.39421 22.1504 11.9999 22.1504ZM13.0008 16.4753C13.0008 15.923 12.5531 15.4753 12.0008 15.4753L11.9998 15.4753C11.4475 15.4753 10.9998 15.923 10.9998 16.4753C10.9998 17.0276 11.4475 17.4753 11.9998 17.4753L12.0008 17.4753C12.5531 17.4753 13.0008 17.0276 13.0008 16.4753ZM11.9998 6.62898C12.414 6.62898 12.7498 6.96476 12.7498 7.37898L12.7498 13.0555C12.7498 13.4697 12.414 13.8055 11.9998 13.8055C11.5856 13.8055 11.2498 13.4697 11.2498 13.0555L11.2498 7.37898C11.2498 6.96476 11.5856 6.62898 11.9998 6.62898Z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="size-5 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.6501 12.0001C3.6501 7.38852 7.38852 3.6501 12.0001 3.6501C16.6117 3.6501 20.3501 7.38852 20.3501 12.0001C20.3501 16.6117 16.6117 20.3501 12.0001 20.3501C7.38852 20.3501 3.6501 16.6117 3.6501 12.0001ZM12.0001 1.8501C6.39441 1.8501 1.8501 6.39441 1.8501 12.0001C1.8501 17.6058 6.39441 22.1501 12.0001 22.1501C17.6058 22.1501 22.1501 17.6058 22.1501 12.0001C22.1501 6.39441 17.6058 1.8501 12.0001 1.8501ZM10.9992 7.52517C10.9992 8.07746 11.4469 8.52517 11.9992 8.52517H12.0002C12.5525 8.52517 13.0002 8.07746 13.0002 7.52517C13.0002 6.97289 12.5525 6.52517 12.0002 6.52517H11.9992C11.4469 6.52517 10.9992 6.97289 10.9992 7.52517ZM12.0002 17.3715C11.586 17.3715 11.2502 17.0357 11.2502 16.6215V10.945C11.2502 10.5308 11.586 10.195 12.0002 10.195C12.4144 10.195 12.7502 10.5308 12.7502 10.945V16.6215C12.7502 17.0357 12.4144 17.3715 12.0002 17.3715Z"
        />
      </svg>
    ),
    info: (
      <svg
        className="size-5 fill-current"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.6501 11.9996C3.6501 7.38803 7.38852 3.64961 12.0001 3.64961C16.6117 3.64961 20.3501 7.38803 20.3501 11.9996C20.3501 16.6112 16.6117 20.3496 12.0001 20.3496C7.38852 20.3496 3.6501 16.6112 3.6501 11.9996ZM12.0001 1.84961C6.39441 1.84961 1.8501 6.39392 1.8501 11.9996C1.8501 17.6053 6.39441 22.1496 12.0001 22.1496C17.6058 22.1496 22.1501 17.6053 22.1501 11.9996C22.1501 6.39392 17.6058 1.84961 12.0001 1.84961ZM10.9992 7.52468C10.9992 8.07697 11.4469 8.52468 11.9992 8.52468H12.0002C12.5525 8.52468 13.0002 8.07697 13.0002 7.52468C13.0002 6.9724 12.5525 6.52468 12.0002 6.52468H11.9992C11.4469 6.52468 10.9992 6.9724 10.9992 7.52468ZM12.0002 17.371C11.586 17.371 11.2502 17.0352 11.2502 16.621V10.9445C11.2502 10.5303 11.586 10.1945 12.0002 10.1945C12.4144 10.1945 12.7502 10.5303 12.7502 10.9445V16.621C12.7502 17.0352 12.4144 17.371 12.0002 17.371Z"
        />
      </svg>
    ),
  };

  const selectedPositionClass =
    positionClasses[position] || positionClasses["top-right"];

  return (
    <div
      role="alert"
      className={`fixed z-99999 flex w-auto max-w-sm sm:max-w-md items-start gap-3 rounded-2xl border p-4 shadow-theme-lg backdrop-blur-md transition-all duration-200 ${isLeaving ? "opacity-0 scale-95" : "opacity-100 scale-100"
        } ${selectedPositionClass} ${variantClasses[variant].container} ${className}`}
    >
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${variantClasses[variant].iconWrapper}`}
      >
        {icons[variant]}
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <h4 className="text-theme-sm font-semibold text-gray-dark dark:text-light-accent leading-5">
          {title}
        </h4>

        {message && (
          <p className="mt-1 text-theme-xs text-gray dark:text-gray-light leading-relaxed">
            {message}
          </p>
        )}

        {showLink && (
          <Link
            href={linkHref}
            className="mt-2.5 inline-flex items-center gap-1 text-theme-xs font-semibold text-brand transition-colors hover:text-brand-dark dark:text-brand-light dark:hover:text-brand"
          >
            <span>{linkText}</span>
            <svg
              className="size-3.5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
              />
            </svg>
          </Link>
        )}
      </div>

      {showClose && (
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar alerta"
          className="shrink-0 rounded-lg p-1 text-gray transition-colors hover:bg-gray-light/60 hover:text-gray-dark dark:text-gray-light dark:hover:bg-light-accent/10 dark:hover:text-light-accent focus:outline-none"
        >
          <svg
            className="size-4.5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
