import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    "2xl"?: number;
  };
  gap?: "sm" | "md" | "lg" | "xl";
}

export const ResponsiveGrid = ({ 
  children, 
  className,
  cols = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "md"
}: ResponsiveGridProps) => {
  const gapClasses = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6", 
    xl: "gap-8"
  };

  const getColsClass = () => {
    const classes = ["grid"];
    
    if (cols.sm) classes.push(`grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols["2xl"]) classes.push(`2xl:grid-cols-${cols["2xl"]}`);
    
    return classes.join(" ");
  };

  return (
    <div className={cn(
      getColsClass(),
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};