import type { ReactNode } from "react";

const ALLOWED = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "blockquote", "h2", "h3", "h4", "a",
]);

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201D", ldquo: "\u201C",
  ndash: "\u2013", mdash: "\u2014", hellip: "\u2026",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000 ? String.fromCodePoint(code) : m;
    }
    return NAMED_ENTITIES[e.toLowerCase()] ?? m;
  });
}

/**
 * Editors sometimes paste HTML *source* into a field, which is then stored (or
 * displayed) with its angle brackets escaped — "&lt;p&gt;Hello&lt;/p&gt;". Turn
 * that back into real markup so it renders instead of showing tags as text.
 */
function decodeEscapedHtml(html: string): string {
  return /&lt;\/?[a-z][^&]*&gt;/i.test(html) ? decodeEntities(html) : html;
}

/**
 * Plain-text version of a string field that should never contain markup. If
 * someone pastes HTML (raw or escaped) into it, strip the tags and decode
 * entities so visitors see clean prose instead of "<p data-start=…>".
 */
export function plainText<T>(value: T): T extends string ? string : T {
  if (typeof value !== "string") return value as any;
  if (!/[<&]/.test(value)) return value as any;
  const html = decodeEscapedHtml(value);
  return decodeEntities(
    html
      .replace(/<(script|style)[\s\S]*?<\/\1\s*>/gi, "")
      .replace(/<\/(p|div|li|h[1-6]|blockquote)>|<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, ""),
  )
    .replace(/\s+/g, " ")
    .trim() as any;
}

/**
 * Minimal allowlist sanitiser for editor-authored HTML (biographies arrive as an
 * HTML string). Keeps basic formatting only: unknown tags are dropped (their text
 * stays), every attribute is removed except a safe http(s)/mailto/relative href
 * on links, and script/style blocks are removed entirely.
 */
export function sanitizeHtml(html: string): string {
  return decodeEscapedHtml(html)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, rawTag: string, attrs: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED.has(tag)) return "";
      if (match.startsWith("</")) return `</${tag}>`;
      if (tag === "a") {
        const href = /href\s*=\s*(?:"([^"]*)"|'([^']*)')/i.exec(attrs);
        const url = (href?.[1] ?? href?.[2] ?? "").trim();
        return /^(https?:\/\/|mailto:|\/)/i.test(url)
          ? `<a href="${url.replace(/"/g, "&quot;")}" target="_blank" rel="noopener noreferrer">`
          : "<a>";
      }
      return tag === "br" ? "<br>" : `<${tag}>`;
    });
}

function renderSlate(nodes: any[]): ReactNode {
  return nodes.map((node, i) => {
    if (typeof node?.text === "string") {
      let out: ReactNode = node.text;
      if (node.bold) out = <strong key={i}>{out}</strong>;
      if (node.italic) out = <em key={i}>{out}</em>;
      if (node.underline) out = <u key={i}>{out}</u>;
      return out;
    }
    const kids = Array.isArray(node?.children) ? renderSlate(node.children) : null;
    switch (node?.type) {
      case "h2":
      case "h3":
      case "h4":
      case "ul":
      case "ol":
      case "li":
      case "blockquote": {
        const Tag = node.type as "h2";
        return <Tag key={i}>{kids}</Tag>;
      }
      case "link": {
        const url = String(node.url ?? "");
        return /^(https?:\/\/|mailto:|\/)/i.test(url) ? (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer">{kids}</a>
        ) : (
          <span key={i}>{kids}</span>
        );
      }
      default:
        return <p key={i}>{kids}</p>;
    }
  });
}

/** Renders a Payload rich-text value: an HTML string or Slate JSON. */
export function RichText({ value, className }: Readonly<{ value: unknown; className?: string }>) {
  if (!value) return null;
  if (typeof value === "string") {
    return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }} />;
  }
  if (Array.isArray(value)) return <div className={className}>{renderSlate(value)}</div>;
  return null;
}

/** Plain text of a rich-text value, for emptiness checks and excerpts. */
export function richTextToPlain(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (Array.isArray(value)) {
    const walk = (n: any): string =>
      typeof n?.text === "string" ? n.text : Array.isArray(n?.children) ? n.children.map(walk).join(" ") : "";
    return value.map(walk).join(" ").replace(/\s+/g, " ").trim();
  }
  return "";
}
