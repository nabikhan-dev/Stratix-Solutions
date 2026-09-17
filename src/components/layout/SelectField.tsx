"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

/**
 * Theme-matched stand-in for a native <select>. The browser paints an option
 * list with its own OS chrome — dark grey on macOS, and unstyleable in every
 * engine — so a form sitting on a light surface can't stay on theme with one.
 *
 * This is the ARIA combobox pattern rather than a roving-focus menu: focus
 * never leaves the trigger, which points at the highlighted row through
 * `aria-activedescendant`. A hidden input carries the value, so the form
 * around it still reads the field through FormData exactly as before.
 */
export default function SelectField({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  className = "",
  error,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  /** The field skin, passed in so it stays identical to the text inputs'. */
  className?: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const listId = `${id}-listbox`;
  const optionId = (index: number) => `${id}-option-${index}`;

  // Pointer down anywhere else dismisses the panel — the trigger keeps focus
  // otherwise, so there is no blur event to lean on.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted row inside the scroll box as the arrows walk past it.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  function openList() {
    // Reopen where the current value sits, not back at the top.
    const current = options.indexOf(value);
    setActiveIndex(current === -1 ? 0 : current);
    setOpen(true);
  }

  function select(option: string) {
    onChange(option);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openList();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        select(options[activeIndex]);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        id={id}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? optionId(activeIndex) : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`flex cursor-pointer items-center justify-between gap-3 text-left ${className}`}
      >
        <span className={value ? "text-primary" : "text-faint"}>{value || placeholder}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-5 shrink-0 text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={placeholder}
          // Keeps focus on the trigger, so arrow keys still work after a click.
          onMouseDown={(e) => e.preventDefault()}
          className="absolute inset-x-0 z-20 mt-2 max-h-64 overflow-y-auto rounded-xl border border-line bg-surface p-1.5 shadow-xl shadow-black/10"
        >
          {options.map((option, index) => {
            const isSelected = option === value;
            return (
              <li
                key={option}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => select(option)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3.5 py-2.5 text-sm transition-colors ${
                  index === activeIndex ? "bg-deep" : ""
                } ${isSelected ? "font-semibold text-signal" : "text-primary"}`}
              >
                {option}
                {isSelected && <Check aria-hidden="true" className="size-4 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
