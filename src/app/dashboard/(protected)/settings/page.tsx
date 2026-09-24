import { PageHeader } from "@/components/dashboard/ui";
import { getSettings } from "@/lib/dashboard/store";
import SettingsForm from "./SettingsForm";

export default async function DashboardSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <PageHeader title="Settings" description="Site metadata and contact details." />
      <SettingsForm settings={settings} />
    </div>
  );
}
