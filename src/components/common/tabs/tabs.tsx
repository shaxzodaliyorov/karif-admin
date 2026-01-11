import * as React from "react";
import {
  Tabs as TabsComponent,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type TabItem = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items?: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  tabsListClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

export function Tabs({
  items = [],
  defaultValue,
  value,
  onValueChange,
  className,
  tabsListClassName,
  triggerClassName,
  contentClassName,
}: TabsProps) {
  return (
    <TabsComponent
      defaultValue={defaultValue ?? items?.[0]?.value}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <TabsList className={cn("flex gap-2", tabsListClassName)}>
        {items?.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cn(
              "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
              triggerClassName
            )}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {items?.map((item) => (
        <TabsContent
          key={item.value}
          value={item.value}
          className={cn("mt-4", contentClassName)}
        >
          {item.content}
        </TabsContent>
      ))}
    </TabsComponent>
  );
}
