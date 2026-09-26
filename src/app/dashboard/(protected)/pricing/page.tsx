"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/dashboard/ui";
import { listPricingTiers, listFeatureCategories } from "@/lib/dashboard/store";
import PricingTierCard from "./PricingTierCard";
import CategoryEditor from "./CategoryEditor";
import type { PricingTier } from "@/data/content";
import type { PricingCategory } from "@/data/pricing";

export default function DashboardPricingPage() {
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [categories, setCategories] = useState<PricingCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([listPricingTiers(), listFeatureCategories()]).then(([t, c]) => {
      setTiers(t);
      setCategories(c);
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="py-12 text-center text-[13.5px] text-muted">Loading…</p>;

  const allFeatures = Array.from(new Set(tiers.flatMap((t) => t.features)));

  return (
    <div>
      <PageHeader title="Pricing" description="MVP packages and the cost-calculator line items shown on /pricing." />

      <h2 className="mb-3 text-[15px] font-semibold text-primary">MVP packages</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        {tiers.map((tier) => (
          <PricingTierCard key={tier.id} tier={tier} allFeatures={allFeatures} />
        ))}
      </div>

      <h2 className="mt-10 mb-3 text-[15px] font-semibold text-primary">Cost calculator line items</h2>
      <p className="mb-4 text-[13.5px] text-muted">
        Grouped by category — click a category to expand it, edit a price inline and hit Save, or add/remove line
        items.
      </p>
      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <CategoryEditor key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
