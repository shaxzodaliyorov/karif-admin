import { Switch as SwitchUI } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled,
  className,
}: SwitchProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <SwitchUI
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onCheckedChange={onChange}
        onClick={(e) => e.stopPropagation()}
      />
      {label && <Label className={disabled ? "opacity-50" : ""}>{label}</Label>}
    </div>
  );
}
