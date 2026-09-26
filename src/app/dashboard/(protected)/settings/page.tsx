"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/ui";
import { getSettings } from "@/lib/dashboard/store";
import SettingsForm from "./SettingsForm";
import type { SiteSettings } from "@/lib/dashboard/store";

export default function DashboardSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;
  if (!settings) return null;

  return (
    <div>
      <PageHeader title="Settings" description="Site metadata and contact details." />
      <SettingsForm settings={settings} />
    </div>
  );
}
