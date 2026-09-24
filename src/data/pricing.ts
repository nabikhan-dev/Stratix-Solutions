export type PricingOption = {
  id: string;
  name: string;
  price: number;
};

export type PricingCategory = {
  id: string;
  name: string;
  options: PricingOption[];
};

/**
 * Feature line items, priced individually. The public estimator that used
 * these was removed with the old pricing section; the /dashboard/pricing
 * editor still reads and writes them — keep this the single copy of this data.
 */
export const featureCategories: PricingCategory[] = [];
