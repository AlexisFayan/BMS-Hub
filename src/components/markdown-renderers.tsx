import { Components } from "react-markdown";

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function extractHeadings(content: string): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-zà-ÿ0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 60);
      headings.push({ level, text, id });
    }
  }
  return headings;
}

const markdownComponents: Components = {
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-orange-50 text-foreground">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border [&>tr:nth-child(even)]:bg-gray-50/60 [&>tr:hover]:bg-orange-50/30 [&>tr]:transition-colors">
      {children}
    </tbody>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left font-semibold text-sm border-b border-orange-200/60 whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-sm text-foreground/80">{children}</td>
  ),
  tr: ({ children }) => <tr>{children}</tr>,
  h1: ({ children }) => (
    <h1 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
  ),
  h2: ({ children }) => {
    const text = typeof children === "string" ? children : "";
    const id = text
      .toLowerCase()
      .replace(/[^a-zà-ÿ0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);
    return (
      <h2
        id={id}
        className="text-xl font-bold mt-10 mb-4 text-foreground pb-2 border-b border-border scroll-mt-24"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = typeof children === "string" ? children : "";
    const id = text
      .toLowerCase()
      .replace(/[^a-zà-ÿ0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);
    return (
      <h3
        id={id}
        className="text-lg font-semibold mt-8 mb-3 text-foreground scroll-mt-24"
      >
        {children}
      </h3>
    );
  },
  h4: ({ children }) => (
    <h4 className="text-base font-semibold mt-6 mb-2 text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed text-foreground/80 mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-1 space-y-2 text-sm text-foreground/80 list-none">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-1 space-y-2 text-sm text-foreground/80 list-decimal list-inside">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="flex items-start gap-2">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
      <span className="leading-relaxed">{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <div className="my-6 rounded-lg border-l-4 border-orange-400 bg-orange-50/50 px-5 py-4 text-sm text-foreground/80">
      {children}
    </div>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-foreground/70">{children}</em>,
  code: ({ children, className }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className={`text-sm ${className || ""}`}>{children}</code>
      );
    }
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
      {children}
    </pre>
  ),
  hr: () => <hr className="my-8 border-border" />,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary underline underline-offset-2 hover:text-primary/80"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export { markdownComponents, estimateReadingTime, extractHeadings };
