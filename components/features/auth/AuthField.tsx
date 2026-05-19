"use client";

import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  trailing?: ReactNode;
  containerClassName?: string;
}

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  function AuthField(
    { label, id, trailing, className, containerClassName, ...inputProps },
    ref,
  ) {
    return (
      <div className={cn("flex flex-col gap-2", containerClassName)}>
        <label
          htmlFor={id}
          className="self-stretch opacity-60 justify-center text-white text-base font-medium font-inter leading-6"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={cn(
              "w-full rounded-md border border-amber-line bg-transparent px-5 py-3.5 text-base text-white placeholder:text-ink-muted focus:border-amber focus:outline-none",
              trailing && "pr-12",
              className,
            )}
            {...inputProps}
          />
          {trailing}
        </div>
      </div>
    );
  },
);
