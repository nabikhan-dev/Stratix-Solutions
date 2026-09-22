"use client";

import { useEffect, useState } from "react";
import {
  BLOG_VIEW_COUNTING_DISABLED,
  BLOG_VIEW_COUNTING_PREFERENCE_KEY,
} from "@/lib/privacy-preferences";

export default function BlogViewPreference() {
  const [disabled, setDisabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser storage is unavailable during server rendering
    setDisabled(localStorage.getItem(BLOG_VIEW_COUNTING_PREFERENCE_KEY) === BLOG_VIEW_COUNTING_DISABLED);
    setReady(true);
  }, []);

  function togglePreference() {
    if (disabled) {
      localStorage.removeItem(BLOG_VIEW_COUNTING_PREFERENCE_KEY);
      setDisabled(false);
      return;
    }

    localStorage.setItem(BLOG_VIEW_COUNTING_PREFERENCE_KEY, BLOG_VIEW_COUNTING_DISABLED);
    setDisabled(true);
  }

  return (
    <div className="mt-6 rounded-xl border border-line bg-surface p-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div>
        <p className="text-sm font-semibold text-primary">Aggregate blog view counting</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          {ready && disabled
            ? "Disabled for this browser. Blog visits will not be added to article view totals."
            : "Enabled. We count article visits without creating a visitor profile."}
        </p>
      </div>
      <button
        type="button"
        onClick={togglePreference}
        disabled={!ready}
        aria-pressed={disabled}
        className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full border border-signal/30 px-4 py-2 text-sm font-semibold text-signal transition-colors hover:border-signal hover:bg-signal hover:text-white disabled:cursor-wait disabled:opacity-50 sm:mt-0"
      >
        {disabled ? "Enable view counting" : "Opt out of view counting"}
      </button>
    </div>
  );
}
