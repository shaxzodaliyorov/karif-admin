import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

interface DocumentItemProps {
  title: string;
  url: string;
}

export function DocumentItem({ title, url }: DocumentItemProps) {
  return (
    <Card className="border shadow-none transition-all">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-xs text-muted-foreground">PDF Document</p>
          </div>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/10 hover:text-primary"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Download className="h-4 w-4" />
            Download
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
