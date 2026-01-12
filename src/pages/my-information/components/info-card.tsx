import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  items: Array<{ label: string; value: string }>;
}

export function InfoCard({ icon, title, items }: InfoCardProps) {
  return (
    <Card className="border shadow-none">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="text-primary">{icon}</div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b border-border pb-3 last:border-0"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {item.label}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
