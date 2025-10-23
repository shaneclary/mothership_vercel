"use client";

import clsx from "clsx";

type TitleRuleProps = {
  as?: keyof JSX.IntrinsicElements; // "h1" | "h2" | ...
  children: string;
  className?: string;
};

/**
 * TitleRule renders each word so:
 * - first capital uses Parisienne
 * - remainder uses Cormorant Garamond
 * - letters are slightly "crunched" so the capital touches
 * - each word is kept on one line to avoid bad breaks
 */
export default function TitleRule({ as = "h1", children, className }: TitleRuleProps) {
  const Tag = as as any;

  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Tag className={clsx("leading-tight text-sage-700", className)}>
      {words.map((word, i) => {
        const first = word.slice(0, 1);
        const rest = word.slice(1);
        // keep punctuation attached (e.g., "Mothers," -> comma on rest)
        return (
          <span key={i} className="inline-block whitespace-nowrap">
            <span
              className="font-[var(--font-parisienne)] text-[1.15em] align-baseline"
              style={{ marginRight: "-0.06em" }} // "crunch" into next letters
            >
              {first}
            </span>
            <span className="font-[var(--font-cormorant)]">
              {rest}
            </span>{" "}
          </span>
        );
      })}
    </Tag>
  );
}
