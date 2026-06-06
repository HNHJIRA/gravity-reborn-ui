import { cn } from "@/lib/utils";

export const HeadingText = ({
  title,
  highlight,
  className,
  size = "default",
  align = "left",
}) => {
  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    default: "text-3xl md:text-5xl",
    lg: "text-3xl md:text-6xl",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <h2
      className={cn(
        "font-cormorant",
        sizeClasses[size],
        alignClasses[align],
        className,
      )}
    >
      {title}{" "}
      {highlight && <span className="text-gradient-gold">{highlight}</span>}
    </h2>
  );
};
