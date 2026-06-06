import { cn } from "@/lib/utils";

export const ContainerWrapper = ({
  children,
  className,
  as: Component = "div",
}) => {
  return (
    <Component className={cn("container mx-auto md:px-20 px-6", className)}>
      {children}
    </Component>
  );
};
