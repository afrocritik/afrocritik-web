import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Form field configuration                                            */
/* ------------------------------------------------------------------ */

export type FieldType =
  | "text"
  | "number"
  | "url"
  | "email"
  | "textarea"
  | "richtext"
  | "select"
  | "multiselect"
  | "relationship"
  | "tags"
  | "image"
  | "file"
  | "toggle"
  | "group"
  | "repeater";

export interface SelectOption {
  label: string;
  value: string;
  /** Render the option greyed-out and unselectable (e.g. already chosen). */
  disabled?: boolean;
}

/** Show this field only when another field's value matches. */
export interface FieldCondition {
  field: string;
  /** Visible when the other field equals this value */
  equals?: string;
  /** Visible when the other field's value is one of these */
  in?: string[];
}

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  /** Conditionally render this field based on another field's value */
  showWhen?: FieldCondition;
  /** Span the full width of the form grid (default: true for textarea/repeater) */
  full?: boolean;
  required?: boolean;
  placeholder?: string;
  description?: string;
  /** Options for select / multiselect / relationship / tags */
  options?: SelectOption[];
  /**
   * For `relationship` fields: the target collection slug (e.g. "themes",
   * "works"). Options are fetched live from `/api/<relationTo>` so values are
   * real record IDs. `options` is kept only as an offline fallback.
   */
  relationTo?: string;
  /** Sub-fields for group / repeater */
  fields?: FieldConfig[];
  /** Label shown on the add button of a repeater */
  addLabel?: string;
  /**
   * For a `select` sub-field inside a `repeater`: a value chosen in one row is
   * disabled in the others, so each option can be used by at most one row (e.g.
   * one "Essential Works" section per work type).
   */
  uniqueInRepeater?: boolean;
  /** Lives in the right sidebar column rather than the main column */
  sidebar?: boolean;
  /**
   * For `richtext` fields: allow editors to insert and resize images inline,
   * placed at the caret position within the body. Inserted images obey the
   * same `maxSizeMB` / `minWidth` / `minHeight` constraints as image fields.
   */
  allowImages?: boolean;

  /* --- Validation constraints --- */
  /** Max character length for text-like fields */
  maxLength?: number;
  /** Min / max for number fields */
  min?: number;
  max?: number;
  /** Accepted upload kind for image/file fields (default: image→image, file→pdf) */
  accept?: "image" | "pdf";
  /** Max upload size in megabytes */
  maxSizeMB?: number;
  /** Minimum image dimensions (quality guard) for image fields */
  minWidth?: number;
  minHeight?: number;
}

export interface FormSection {
  title: string;
  description?: string;
  fields: FieldConfig[];
}

/* ------------------------------------------------------------------ */
/* List / table configuration                                          */
/* ------------------------------------------------------------------ */

export type ColumnRender =
  | "text"
  | "media" // thumbnail + title
  | "status"
  | "badges"
  | "date";

export interface ColumnConfig {
  key: string;
  label: string;
  render?: ColumnRender;
  /** Secondary field rendered under the title for the `media` column */
  subKey?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

export interface FilterConfig {
  key: string;
  label: string;
  options: SelectOption[];
}

/* ------------------------------------------------------------------ */
/* Entity record + config                                              */
/* ------------------------------------------------------------------ */

export type EntityRecord = Record<string, unknown> & { id: string };

export interface EntityConfig {
  /** URL segment, e.g. "works" → /admin/works */
  slug: string;
  /** Singular label, e.g. "Work" */
  singular: string;
  /** Plural label, e.g. "Works" */
  plural: string;
  description: string;
  icon?: LucideIcon | string;
  /** The primary text field used in the "Add New" label and titles */
  titleField: string;
  searchPlaceholder?: string;
  columns: ColumnConfig[];
  filters?: FilterConfig[];
  form: FormSection[];
  /** Lightweight create/edit handled in a modal instead of a dedicated page */
  inlineForm?: boolean;
}
