import type { FieldConfig } from "./types";

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/**
 * Synchronous, value-only validation used on submit and on blur.
 * Upload type/size/dimension checks happen at selection time inside the
 * image control (see `validateFileSelection`), not here.
 */
export function validateField(field: FieldConfig, value: unknown): string | null {
  const isEmpty =
    value === "" ||
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0);

  if (field.required && isEmpty) {
    return `${field.label} is required.`;
  }
  if (isEmpty) return null; // optional + empty → nothing else to check

  if (typeof value === "string") {
    const v = value.trim();
    if (field.type === "url" && !isValidUrl(v)) {
      return "Enter a valid URL starting with http:// or https://";
    }
    if (field.type === "email" && !isValidEmail(v)) {
      return "Enter a valid email address.";
    }
    if (field.maxLength && v.length > field.maxLength) {
      return `Keep this under ${field.maxLength} characters.`;
    }
  }

  if (field.type === "number" && typeof value === "number") {
    if (field.min !== undefined && value < field.min) {
      return `Must be at least ${field.min}.`;
    }
    if (field.max !== undefined && value > field.max) {
      return `Must be no more than ${field.max}.`;
    }
  }

  return null;
}

/** Resolve the accepted upload kind for an image/file field. */
export function acceptKind(field: FieldConfig): "image" | "pdf" {
  return field.accept ?? (field.type === "file" ? "pdf" : "image");
}

/**
 * Validates a freshly-selected File against the field's constraints —
 * type, size, and (for images) dimensions. Resolves to an error string or
 * null if the file is acceptable.
 */
export async function validateFileSelection(
  field: FieldConfig,
  file: File
): Promise<string | null> {
  const kind = acceptKind(field);

  // --- Type ---
  if (kind === "image" && !file.type.startsWith("image/")) {
    return "That's not an image. Please upload a PNG, JPG or WEBP file.";
  }
  if (kind === "pdf" && file.type !== "application/pdf") {
    return "That's not a PDF. Please upload a .pdf file.";
  }

  // --- Size ---
  const maxMB = field.maxSizeMB ?? (kind === "image" ? 5 : 25);
  if (file.size > maxMB * 1024 * 1024) {
    return `File is too large (max ${maxMB}MB).`;
  }

  // --- Image dimensions / quality ---
  if (kind === "image") {
    const dims = await readImageDimensions(file).catch(() => null);
    if (!dims) return "Couldn't read that image — it may be corrupted.";
    const minW = field.minWidth ?? 0;
    const minH = field.minHeight ?? 0;
    if (dims.width < minW || dims.height < minH) {
      return `Image is too small (${dims.width}×${dims.height}). Minimum ${minW}×${minH}px for good quality.`;
    }
  }

  return null;
}

function readImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      reject(new Error("decode failed"));
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}
