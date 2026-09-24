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
  let images: string[] = [];
  let body: string[] = [];

  const flush = () => {
    const trimmed = body.join("\n").trim();
    if (trimmed || heading || images.length > 0) {
      const section: BlogSection = { body: trimmed, images: [...images] };
      if (heading !== undefined) {
        section.heading = heading;
      }
      sections.push(section);
    }
    body = [];
    images = [];
    heading = undefined;
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flush();
      heading = line.slice(3).trim();
    } else if (line.startsWith("IMAGE: ")) {
      images.push(line.slice(7).trim());
    } else {
      body.push(line);
    }
  }
  flush();

  return sections.filter((s) => s.body.length > 0);
}

export function serializeSections(sections: BlogSection[]): string {
  return sections
    .map((s) => {
      const parts = [];
      if (s.heading) parts.push(`## ${s.heading}`);
      if (s.images && s.images.length > 0) {
        s.images.forEach((img) => parts.push(`IMAGE: ${img}`));
      }
      if (s.body) parts.push(s.body);
      return parts.join("\n");
    })
    .join("\n\n");
}
