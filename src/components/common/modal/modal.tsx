import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  trigger?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  size = "md",
  trigger,
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full h-full m-0 rounded-none",
  };

  const modalContent = (
    <Dialog open={open} onOpenChange={onClose}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className={`${sizeClasses[size]} p-0 overflow-hidden`}>
        {(title || !trigger) && (
          <DialogHeader className="px-6 py-4 border-b bg-muted/40 flex flex-row justify-between items-center">
            {title && <DialogTitle>{title}</DialogTitle>}
          </DialogHeader>
        )}
        <div className="p-6">{children}</div>
      </DialogContent>
    </Dialog>
  );

  return modalContent;
};
