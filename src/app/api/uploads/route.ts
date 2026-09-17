import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/dashboard/session";

// Lets the dashboard upload an image file from disk instead of only
// pasting a URL. Writes straight to /public/uploads and hands back the
// resulting path — no object-storage service wired up.
//
// Same caveat as the rest of the dashboard's data layer: this needs a
// writable filesystem that persists between requests. Works fine for local
// dev and a traditional Node/Docker server; it will NOT work on serverless
// hosts (Vercel, etc.) where the filesystem is read-only/ephemeral at
// runtime — swap this for real object storage (S3, Vercel Blob, Supabase
// Storage, ...) before deploying there.

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

export async function POST(req: Request) {
  // Auth-gated — this writes to disk, so it must not be a public endpoint.
  // A plain 401 here (not requireSession()'s redirect) because this is hit
  // via fetch() from the dashboard UI, not rendered as a page — a redirect
  // response would just fail to parse as the JSON the client expects.
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return NextResponse.json(
      { error: "Unsupported file type. Use JPEG, PNG, WebP, GIF, or SVG." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is larger than 5MB." }, { status: 400 });
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const filename = `${randomUUID()}.${extension}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
