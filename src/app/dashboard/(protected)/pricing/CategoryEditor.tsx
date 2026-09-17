import { inputClass, buttonGhostClass } from "@/components/dashboard/ui";
import SubmitButton from "@/components/dashboard/SubmitButton";
import DeleteForm from "@/components/dashboard/DeleteForm";
import { updateFeatureOptionAction, createFeatureOptionAction, deleteFeatureOptionAction } from "./actions";
import type { PricingCategory } from "@/data/pricing";

export default function CategoryEditor({ category }: { category: PricingCategory }) {
  const total = category.options.reduce((sum, o) => sum + o.price, 0);

  return (
    <details className="group rounded-2xl border border-line bg-surface open:pb-2">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-semibold text-primary">{category.name}</span>
          <span className="text-[12.5px] text-faint">{category.options.length} items</span>
        </div>
        <span className="text-[13px] text-muted">${total.toLocaleString()} total</span>
      </summary>

      <div className="flex flex-col gap-2 border-t border-line px-5 py-4">
        {category.options.map((option) => (
          // Two sibling <form>s (not one nested inside the other — nested
          // forms are invalid HTML and browsers will misattribute submits).
          // The update form uses `contents` so its inputs still lay out as
          // plain grid items alongside the separate delete form.
          <div key={option.id} className="grid grid-cols-[1fr_110px_auto_auto] items-center gap-2">
            <form action={updateFeatureOptionAction} className="contents">
              <input type="hidden" name="categoryId" value={category.id} />
              <input type="hidden" name="optionId" value={option.id} />
              <input
                name="name"
                defaultValue={option.name}
                aria-label={`Name for ${option.name}`}
                className={`${inputClass} py-2`}
              />
              <input
                name="price"
                type="number"
                min={0}
                step={1}
                defaultValue={option.price}
                aria-label={`Price for ${option.name}`}
                className={`${inputClass} py-2`}
              />
              <SubmitButton pendingLabel="…" className={`${buttonGhostClass} px-3! py-2!`}>
                Save
              </SubmitButton>
            </form>
            <DeleteForm
              action={deleteFeatureOptionAction}
              hiddenFields={{ categoryId: category.id, optionId: option.id }}
              confirmMessage={`Remove "${option.name}"?`}
              label="Remove"
            />
          </div>
        ))}

        <form
          action={createFeatureOptionAction}
          className="mt-2 grid grid-cols-[1fr_110px_auto] items-center gap-2 border-t border-line pt-3"
        >
          <input type="hidden" name="categoryId" value={category.id} />
          <input name="name" placeholder="New line item name" className={`${inputClass} py-2`} />
          <input name="price" type="number" min={0} step={1} placeholder="Price" className={`${inputClass} py-2`} />
          <SubmitButton pendingLabel="Adding…" className={`${buttonGhostClass} px-3! py-2!`}>
            + Add
          </SubmitButton>
        </form>
      </div>
    </details>
  );
}
