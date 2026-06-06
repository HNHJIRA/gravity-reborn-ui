import { cn } from "@/lib/utils";

export const SectionWrapper = ({ children, className, id }) => {
  return (
    <section
      id={id}
      className={cn("relative py-10 overflow-hidden", className)}
    >
      {children}
    </section>
  );
};
