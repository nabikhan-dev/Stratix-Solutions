import { NextResponse } from "next/server";
import { getViewCount, incrementViewCount, formatViewCount } from "@/lib/view-counts";

// Public, unauthenticated by design — reading/bumping a post's view count
// isn't sensitive. GET just reads; POST records a real visit (called once
// per browser session per post — see ViewBadge's sessionStorage guard).

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const count = await getViewCount(slug);
  return NextResponse.json({ count, label: formatViewCount(count) });
}

export async function POST(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const count = await incrementViewCount(slug);
  return NextResponse.json({ count, label: formatViewCount(count) });
}

