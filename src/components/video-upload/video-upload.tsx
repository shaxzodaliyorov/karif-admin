import { useState } from "react";
import { Video } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { VideoCard } from "./video-card";
import { useGetUser } from "@/hooks/use-get-user";
import { EditVideos } from "./edit-videos";
export const VideoUpload = () => {
  const user: any = useGetUser();

  const [editData, setEditData] = useState<{
    type: "interviewVideo" | "experienceVideo" | "skillsVerificationVideo";
    url: string;
  } | null>(null);

  const handleEdit = (
    type: "interviewVideo" | "experienceVideo" | "skillsVerificationVideo",
    url: string = ""
  ) => {
    setEditData({ type, url });
  };

  const videoSections = [
    {
      title: "Interview Video",
      url: user?.interviewVideo as string | undefined,
      color: "border-l-green-500",
      type: "interviewVideo" as const,
    },
    {
      title: "Experience Video",
      url: user?.experienceVideo as string | undefined,
      color: "border-l-blue-500",
      type: "experienceVideo" as const,
    },
    {
      title: "Skills Verification Video",
      url: user?.skillsVerificationVideo as string | undefined,
      color: "border-l-purple-500",
      type: "skillsVerificationVideo" as const,
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <Card className="shadow-none border-none px-0">
          <CardHeader className="border-b px-0 bg-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Video className="h-5 w-5 text-blue-600" />
                Videos
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 p-6 px-0">
            <div className="grid gap-6 lg:grid-cols-1">
              {videoSections.map((section) => (
                <VideoCard
                  key={section.type}
                  title={section.title}
                  videoUrl={section.url}
                  color={section.color}
                  type={section.type}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <EditVideos
        open={editData !== null}
        onOpenChange={() => setEditData(null)}
        editType={editData?.type as any}
        url={editData?.url ?? ""}
      />
    </div>
  );
};
