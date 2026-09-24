"use client";

import { useState, useRef, useEffect } from "react";
import { inputClass } from "./ui";

export default function CategoryCombobox({
  defaultValue = "",
  existingCategories = [],
  required,
}: {
  defaultValue?: string;
  existingCategories?: string[];
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Filter existing categories based on what the user has typed
  const filtered = existingCategories.filter((cat) =>
    cat.toLowerCase().includes(value.toLowerCase())
  );

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <input
        id="category"
        name="category"
        value={value}
        required={required}
        onChange={(e) => {
          setValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        autoComplete="off"
        placeholder="Enter or choose a category…"
        className={inputClass}
      />

      {isOpen && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-48 overflow-y-auto rounded-lg border border-line bg-surface py-1 shadow-lg shadow-black/5">
          {filtered.map((cat) => (
            <li
              key={cat}
              onClick={() => {
                setValue(cat);
                setIsOpen(false);
              }}
              className="cursor-pointer px-3.5 py-2 text-[14px] text-primary transition hover:bg-deep"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
