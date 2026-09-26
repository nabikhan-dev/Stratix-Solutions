"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { inputClass, buttonGhostClass } from "@/components/dashboard/ui";
import DeleteButton from "@/components/dashboard/DeleteButton";
import { updateFeatureOptionAction, createFeatureOptionAction, deleteFeatureOptionAction } from "./actions";
import type { PricingCategory } from "@/data/pricing";

export default function CategoryEditor({ category }: { category: PricingCategory }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const total = category.options.reduce((sum, o) => sum + o.price, 0);

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const categoryId = String(formData.get("categoryId"));
    const optionId = String(formData.get("optionId"));
    const name = String(formData.get("name"));
    const price = Number(formData.get("price"));
    await updateFeatureOptionAction(categoryId, optionId, name, price);
    setIsPending(false);
    router.refresh();
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    const categoryId = String(formData.get("categoryId"));
    const name = String(formData.get("name"));
    const price = Number(formData.get("price"));
    await createFeatureOptionAction(categoryId, name, price);
    (e.target as HTMLFormElement).reset();
    setIsPending(false);
    router.refresh();
  }

  async function handleDelete(categoryId: string, optionId: string) {
    setIsPending(true);
    await deleteFeatureOptionAction(categoryId, optionId);
    setIsPending(false);
    router.refresh();
  }

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
          <div key={option.id} className="grid grid-cols-[1fr_110px_auto_auto] items-center gap-2">
            <form onSubmit={handleUpdate} className="contents">
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
              <button disabled={isPending} type="submit" className={`${buttonGhostClass} px-3! py-2!`}>
                Save
              </button>
            </form>
            <DeleteButton
              onDelete={() => handleDelete(category.id, option.id)}
              confirmMessage={`Remove "${option.name}"?`}
              label="Remove"
              isPending={isPending}
            />
          </div>
        ))}

        <form
          onSubmit={handleCreate}
          className="mt-2 grid grid-cols-[1fr_110px_auto] items-center gap-2 border-t border-line pt-3"
        >
          <input type="hidden" name="categoryId" value={category.id} />
          <input name="name" placeholder="New line item name" className={`${inputClass} py-2`} required />
          <input name="price" type="number" min={0} step={1} placeholder="Price" className={`${inputClass} py-2`} required />
          <button disabled={isPending} type="submit" className={`${buttonGhostClass} px-3! py-2!`}>
            + Add
          </button>
        </form>
      </div>
    </details>
  );
}
