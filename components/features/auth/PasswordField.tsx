"use client";

import { InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthField } from "./AuthField";

interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string;
  containerClassName?: string;
}

export function PasswordField({
  label,
  id,
  containerClassName,
  ...rest
}: Readonly<PasswordFieldProps>) {
  const [show, setShow] = useState(false);
  return (
    <AuthField
      id={id}
      label={label}
      type={show ? "text" : "password"}
      containerClassName={containerClassName}
      trailing={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-amber"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      }
      {...rest}
    />
  );
}
