import type { ReactNode } from "react";

const ALLOWED = new Set([
  "p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "blockquote", "h2", "h3", "h4", "a",
]);

/**
 * Minimal allowlist sanitiser for editor-authored HTML (biographies arrive as an
 * HTML string). Keeps basic formatting only: unknown tags are dropped (their text
 * stays), every attribute is removed except a safe http(s)/mailto/relative href
 * on links, and script/style blocks are removed entirely.
 */
export function sanitizeHtml(html: string): string {
  return html
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
