import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function PageHeader({
  title,
  description,
  className,
  actions,
  showBackButton = false,
  onBack,
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 pb-6 pt-2 md:pb-8", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button onClick={onBack} className="h-12 w-12">
              <ArrowLeft className="h-6 w-h-6" />
            </button>
          )}

          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground max-w-2xl text-lg">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
