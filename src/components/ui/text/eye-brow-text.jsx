import { cn } from "@/lib/utils";

export const EyebrowText = ({
  text,
  className,
  spacing = "wide",
  align = "left",
}) => {
  const spacingClasses = {
    normal: "tracking-normal",
    wide: "tracking-[0.3em]",
    extra: "tracking-[0.5em]",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <span
      className={cn(
        "text-gradient-gold text-sm uppercase block",
        spacingClasses[spacing],
        alignClasses[align],
        className,
      )}
    >
      {text}
    </span>
  );
};
