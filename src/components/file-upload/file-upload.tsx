import { FileText, Image as ImageIcon, Upload, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { usePublicFileUpload } from "@/hooks/use-public-file-uplaod";

const MAX_FILE_SIZE = 50 * 1024 * 1024;

export interface FileUploadProps {
  label: string;
  name: string;
  value?: string;
  onChange: (val?: string) => void;
  required?: boolean;
  errorMessage?: string;
  accept?: string[];
}

export function FileUpload({
  label,
  name,
  value,
  onChange,
  required = true,
  errorMessage,
  accept = ["application/pdf", "image/jpeg", "image/png"],
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { handleFileUpload, isLoading } = usePublicFileUpload();

  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setPreviewUrl(value);
  }, [value]);

  // const formatFileSize = (bytes: number) => {
  //   if (bytes === 0) return "0 Bytes";
  //   const k = 1024;
  //   const sizes = ["Bytes", "KB", "MB"];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return (
  //     Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  //   );
  // };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setError("");

    if (!selected) return;

    if (!accept.includes(selected.type)) {
      setError(`Please upload one of: ${accept.join(", ")}`);
      return;
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError("File size must be less than 20MB");
      return;
    }

    try {
      toast.info("Uploading file...");
      const uploadedUrl = await handleFileUpload(selected);

      if (uploadedUrl) {
        toast.success("File uploaded successfully!");
        setPreviewUrl(uploadedUrl);
        onChange(uploadedUrl);
      } else {
        toast.error("Failed to upload file");
      }
    } catch (err) {
      console.error(err);
      toast.error("File upload failed");
    }
  };

  const removeFile = () => {
    setPreviewUrl(undefined);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
    onChange(undefined);
  };

  const renderPreview = () => {
    if (previewUrl) {
      return (
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {previewUrl.match(/\.(jpeg|jpg|png)$/i) ? (
                <ImageIcon className="h-8 w-8 text-blue-500" />
              ) : (
                <FileText className="h-8 w-8 text-red-500" />
              )}
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-blue-600 truncate max-w-[200px]"
              >
                {previewUrl.split("/").pop()}
              </a>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="relative">
        <input
          id={name}
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept={accept
            .map((t) => t.replace("image/", ".").replace("application/", "."))
            .join(",")}
        />
        <Label
          htmlFor={name}
          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
        >
          <div className="text-center">
            <Upload
              className={`mx-auto h-8 w-8 mb-2 ${
                isLoading ? "animate-pulse text-blue-400" : "text-gray-400"
              }`}
            />
            <p className="text-sm text-gray-600">
              {isLoading ? "Uploading..." : "Click to upload file"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Allowed: {accept.map((a) => a.split("/").pop()).join(", ")} (Max
              50MB)
            </p>
          </div>
        </Label>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {renderPreview()}

      {(errorMessage || error) && (
        <p className="text-sm text-red-500">{errorMessage || error}</p>
      )}
      <p className="text-xs text-gray-500">Max 5 MB</p>
    </div>
  );
}
