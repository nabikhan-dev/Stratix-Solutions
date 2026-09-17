import type { BlogSection } from "@/data/blog";

// Blog post bodies (BlogPost["sections"]) are an array of {heading?, body}.
// Editing that as a repeating add/remove-row form is a lot of client-side
// state for a v1 admin tool, so instead the dashboard edits it as one
// textarea using a small markdown-ish convention: a line starting with
// "## " begins a new (optionally headed) section, everything else is that
// section's body. Shared here so the blog new/edit forms and their Server
// Actions parse/serialize it identically.

export function parseSections(text: string): BlogSection[] {
  const lines = text.split("\n");
  const sections: BlogSection[] = [];
  let heading: string | undefined;
  let body: string[] = [];

  const flush = () => {
    const trimmed = body.join("\n").trim();
    if (trimmed || heading) sections.push({ heading, body: trimmed });
    body = [];
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      heading = line.slice(3).trim();
    } else {
      body.push(line);
    }
  }
  flush();

  return sections.filter((s) => s.body.length > 0);
}

export function serializeSections(sections: BlogSection[]): string {
  return sections.map((s) => (s.heading ? `## ${s.heading}\n${s.body}` : s.body)).join("\n\n");
}
