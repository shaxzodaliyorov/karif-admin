/* eslint-disable prefer-const */
// hooks/useVideoUpload.ts
import { useState } from "react";
import { getAccessToken } from "@/utils/tokenStorage";
import { SERVER_URL } from "@/constants";

export interface UploadProgress {
  progress: number;
  location?: string;
}

export const useVideoUpload = () => {
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadVideo = async (file: File) => {
    setIsUploading(true);
    setProgress(0);
    setVideoUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${SERVER_URL}/upload/file-large`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "text/event-stream",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      if (!response.ok || !response.body) {
        throw new Error("Upload failed");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const data = decoder.decode(value);
        const lines = data.trim().split("\n");

        for (let line of lines) {
          if (line.startsWith("data: ")) {
            const json = JSON.parse(
              line.replace("data: ", "")
            ) as UploadProgress;

            if (json.progress !== undefined) {
              setProgress(json.progress);
            }

            if (json.location) {
              setVideoUrl(json.location);
            }
          }
        }
      }
    } catch (err) {
      console.error("Video upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadVideo, progress, videoUrl, isUploading };
};
