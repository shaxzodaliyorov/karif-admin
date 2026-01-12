import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Assuming shadcn/ui is installed and configured
import { cn } from "@/lib/utils";

export interface ImageProps {
  src: string;
  alt: string;
  defaultSrc?: string;
  isPreview?: boolean;
  className?: string;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  defaultSrc = "/images/default-image.jpg",
  isPreview = false,
  className = "",
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isOpen, setIsOpen] = useState(false);

  const handleError = () => {
    setImageSrc(defaultSrc);
  };

  const imageElement = (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={cn(
        className,
        isPreview &&
          "cursor-pointer hover:scale-105 transition-transform hover:brightness-75"
      )}
    />
  );

  if (isPreview) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{imageElement}</DialogTrigger>
        <DialogContent className="max-w-4xl">
          <img src={imageSrc} alt={alt} className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    );
  }

  return imageElement;
};
