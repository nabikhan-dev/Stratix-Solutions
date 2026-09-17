import { PageHeader } from "@/components/dashboard/ui";
import { listServices } from "@/lib/dashboard/store";
import ServiceEditCard from "./ServiceEditCard";

export default function DashboardServicesPage() {
  const services = listServices();

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
