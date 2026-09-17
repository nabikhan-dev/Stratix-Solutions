import type { ElementType } from "react";

/**
 * A label that rolls bottom-to-top under the pointer.
 *
 * Two identical copies of the text sit in a mask exactly one line tall: the
 * visible copy leaves through the top while its twin arrives from the bottom,
 * so the words are only ever moved, never rewritten. It replaces the glyph
 * scramble this site used to run on hover, which resolved a label character
 * by character and left it unreadable for as long as the pointer sat on it.
 *
 * The label travels as one block rather than per character — the whole point
 * is that it stays legible the entire way up.
 *
 * `group` hands the trigger to an ancestor marked `data-roll-group`, which is
 * how a whole pill can drive the label inside it: hovering the arrow rolls
 * the words too.
 *
 * The motion itself lives in CSS (`.text-roll` in globals.css), so a hover
 * costs no JavaScript, no state and no listeners — and unlike a timed run,
 * there is nothing to cancel when the pointer leaves mid-flight. That also
 * lets this render on the server.
 */
export type TextRollTrigger =
  /** Fires when this element itself is hovered. */
  | "hover"
  /** Fires when the nearest `[data-roll-group]` ancestor is hovered. */
  | "group";

export default function TextRoll({
  text,
  trigger = "hover",
  as: Tag = "span",
  className = "",
}: {
  text: string;
  trigger?: TextRollTrigger;
  as?: ElementType;
  className?: string;
}) {
  return (
    <Tag className={`text-roll text-roll--${trigger} ${className}`}>
      {/* Both moving copies are decoration, so the label is exposed once. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="text-roll__face text-roll__face--out">
        {text}
      </span>
      <span aria-hidden="true" className="text-roll__face text-roll__face--in">
        {text}
      </span>
    </Tag>
  );
}
