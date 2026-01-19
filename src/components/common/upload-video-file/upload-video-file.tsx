import { Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useVideoUpload } from "@/hooks/use-video-upload";

interface VideoUploadProps {
  label: string;
  value?: string;
  onChange: (val?: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  required?: boolean;
}

export const UploadVideoFile: React.FC<VideoUploadProps> = ({
  label,
  value,
  onChange,
  onUploadingChange,
  required = true,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { uploadVideo, progress, videoUrl, isUploading } = useVideoUpload();
  const [localUrl, setLocalUrl] = useState<string | undefined>(value);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    onUploadingChange?.(isUploading);
  }, [isUploading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setLocalUrl(undefined);

    await uploadVideo(file);
    console.log(videoUrl);

    onChange(videoUrl as string);
    URL.revokeObjectURL(localPreview);
  };

  useEffect(() => {
    if (videoUrl) {
      setLocalUrl(videoUrl);
      setPreviewUrl(undefined);
      onChange(videoUrl as string);
    }
  }, [videoUrl]);

  const removeVideo = () => {
    setLocalUrl(undefined);
    setPreviewUrl(undefined);
    if (inputRef.current) inputRef.current.value = "";
    onChange(undefined);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {localUrl || previewUrl ? (
        <Card className="overflow-hidden p-0 relative group">
          <div className="relative aspect-video bg-black/5">
            <video
              src={previewUrl || localUrl}
              controls
              autoPlay={!!previewUrl}
              muted={!!previewUrl}
              className="w-full h-full object-contain bg-black rounded-md"
            />

            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={removeVideo}
              className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </Button>

            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white space-y-3">
                <p className="text-sm font-medium">Uploading... {progress}%</p>
                <div className="w-2/3 bg-white/30 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {localUrl && (
            <CardContent className="p-3 flex justify-between items-center text-sm text-gray-600 bg-gray-50 border-t">
              <span className="truncate max-w-[80%]">
                {localUrl.split("/").pop()}
              </span>
              <span className="text-green-600 font-medium">Uploaded ✓</span>
            </CardContent>
          )}
        </Card>
      ) : (
        <div className="relative">
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-blue-50"
          >
            <Upload
              className={`mx-auto h-8 w-8 mb-2 ${
                isUploading
                  ? "animate-pulse text-blue-500"
                  : "text-gray-400 group-hover:text-blue-500"
              }`}
            />
            <p className="text-sm text-gray-600 font-medium">
              {isUploading ? "Uploading..." : "Click or drop to upload video"}
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: MP4, MOV, AVI
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
