"use client";

import { useState } from "react";

import { ReactNode } from "react";

const TextExpander = ({ children }: { children?: ReactNode }) => {
    const [isExpanded, setIsExpanded] = useState(false);

  const text = typeof children === "string" ? children : "";
  const displayText = isExpanded
    ? children
    : text.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <span>
      {displayText}{" "}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
}

export default TextExpander