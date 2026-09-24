import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSession } from "@/lib/dashboard/session";
import { getAdminStorage } from "@/lib/firebase-admin";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

export async function POST(req: Request) {
  // Auth-gated
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

  const filename = `${randomUUID()}.${extension}`;
  const bucket = getAdminStorage();

  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileObj = bucket.file(`uploads/${filename}`);

    await fileObj.save(fileBuffer, {
      metadata: {
        contentType: file.type,
      },
    });

    // Make the file publicly accessible
    await fileObj.makePublic();

    // Get the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/uploads/${filename}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Firebase Storage Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload to Firebase Storage." },
      { status: 500 }
    );
  }
}
