import { Link } from "@strapi/design-system";
import React from "react";

export const parseMarkdownLinks = (text) => {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  for (let i = 1; i < parts.length; i += 2) {
    const match = /\[([^\]]+)]\(([^)]+)\)/.exec(parts[i]);
    if (match) {
      parts[i] = (
        <Link href={match[2]} key={i}>
          {match[1]}
        </Link>
      );
    }
  }
  return parts;
};
