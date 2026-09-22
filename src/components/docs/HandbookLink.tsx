import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function HandbookLink({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: ReactNode;
}) {
  if (slug === "index") {
    return (
      <Link to="/" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/docs/$" params={{ _splat: slug }} className={className}>
      {children}
    </Link>
  );
}
