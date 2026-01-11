import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

const statusVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        verified:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        unverified:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        pending:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        rejected:
          "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

const iconMap: Record<string, LucideIcon> = {
  verified: CheckCircle2,
  unverified: XCircle,
  pending: Clock,
  rejected: AlertTriangle,
};

export type StatusProps = {
  label?: string;
  icon?: LucideIcon | false;
} & VariantProps<typeof statusVariants> &
  React.HTMLAttributes<HTMLSpanElement>;

export function Status({
  variant,
  label,
  icon,
  className,
  ...props
}: StatusProps) {
  const Icon = icon === false ? null : icon ?? iconMap[variant ?? "pending"];

  return (
    <span className={cn(statusVariants({ variant }), className)} {...props}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label ?? variant}
    </span>
  );
}
