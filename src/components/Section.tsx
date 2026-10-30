import type { ReactNode, CSSProperties } from "react";
import { cn } from "../utils/cn";

export interface SectionProps {
  id: string;
  image?: string;
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function Section({ id, image, className = "", children, style }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scene", className)}
      style={{ backgroundImage: image ? `url(${image})` : undefined, ...style }}
    >
      {children}
    </section>
  );
}

export default Section;
