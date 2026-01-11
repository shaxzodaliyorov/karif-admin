import { SearchX } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type TableNotFoundProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function TableNotFound({
  title = "No data found",
  description = "There is no data to display right now.",
  icon,
  actionLabel,
  onAction,
  className,
}: TableNotFoundProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-10 text-center",
        className
      )}
    >
      <div className="text-muted-foreground">
        {icon ?? <SearchX className="h-10 w-10" />}
      </div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="max-w-sm text-xs text-muted-foreground">{description}</p>

      {actionLabel && onAction && (
        <Button size="sm" variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
