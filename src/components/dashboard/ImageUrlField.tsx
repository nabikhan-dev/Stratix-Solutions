"use client";

import { useRef, useState } from "react";
import { ImageOff, Upload, Loader2 } from "lucide-react";
import { Field, inputClass } from "./ui";
import { publicPath } from "@/lib/public-path";

/**
 * An image field for the dashboard: paste a URL, or upload a file from
 * disk (POSTs to /api/uploads, which writes it into /public/uploads and
 * hands back its path — see that route for the "needs a writable
 * filesystem" caveat). Either way it settles on one URL string, shown as a
 * live thumbnail preview so you can confirm it's the right image.
 */
export default function ImageUrlField({
  id,
  name,
  label,
  defaultValue,
  required,
}: {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [broken, setBroken] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const trimmed = url.trim();

  async function handleFileSelected(file: File) {
    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.set("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed.");
      setUrl(data.url);
      setBroken(false);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label} htmlFor={id}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="text"
          required={required}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setBroken(false);
          }}
          className={inputClass}
          placeholder="https://… or upload a file"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = ""; // let selecting the same file again re-trigger onChange
            if (file) handleFileSelected(file);
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          title="Upload from your computer"
          className="grid size-10.5 shrink-0 place-items-center rounded-lg border border-line bg-surface text-muted transition hover:border-line-strong hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />
          ) : (
            <Upload className="size-4" strokeWidth={1.75} />
          )}
        </button>

        <div className="grid size-10.5 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-deep">
          {trimmed && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary external/uploaded URLs; next/image optimization isn't the point of a small live preview thumbnail
            <img src={publicPath(trimmed)} alt="" className="size-full object-cover" onError={() => setBroken(true)} />
          ) : (
            <ImageOff className="size-4 text-faint" strokeWidth={1.75} />
          )}
        </div>
      </div>

      {uploadError && <p className="mt-1.5 text-[12.5px] text-danger">{uploadError}</p>}
      {!uploadError && trimmed && broken && (
        <p className="mt-1.5 text-[12.5px] text-danger">Couldn&apos;t load an image from that URL.</p>
      )}
    </Field>
  );
}
