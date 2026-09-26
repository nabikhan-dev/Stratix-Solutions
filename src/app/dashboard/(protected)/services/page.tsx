"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/ui";
import { listServices } from "@/lib/dashboard/store";
import ServiceEditCard from "./ServiceEditCard";
import type { PrimaryService } from "@/data/content";

export default function DashboardServicesPage() {
  const [services, setServices] = useState<PrimaryService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;

  return (
    <div>
      <PageHeader
        title="Services"
        description="The four core service pillars shown on /services. This set is fixed — edit each one's copy below."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <ServiceEditCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
