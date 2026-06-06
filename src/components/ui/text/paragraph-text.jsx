import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva("font-normal text-[#A3A3A3] leading-relaxed", {
  variants: {
    size: {
      sm: "text-sm",
      base: "text-sm md:text-base",
      lg: "text-base md:text-lg",
      xl: "text-md md:text-xl",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    size: "base",
    align: "left",
  },
});

export const ParagraphText = ({ text, size, align, className, children }) => {
  return (
    <p className={cn(paragraphVariants({ size, align }), className)}>
      {text ? text : children}
    </p>
  );
};
