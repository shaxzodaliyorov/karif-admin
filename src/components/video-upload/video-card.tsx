import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Plus, User } from "lucide-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { VideoPlayer } from "./video-player";

type VideoType =
  | "interviewVideo"
  | "experienceVideo"
  | "skillsVerificationVideo";

type VideoCardProps = {
  title: string;
  videoUrl?: string;
  color: string;
  type: VideoType;
  onEdit: (type: VideoType, url?: string) => void;
  hideActions?: boolean;
};

export const VideoCard = ({
  title,
  videoUrl,
  color,
  type,
  onEdit,
  hideActions = false,
}: VideoCardProps) => {
  return (
    <Card className={`border-l-4 ${color}`}>
      <div className="relative">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
              </div>
            </div>

            <div className="aspect-video overflow-hidden bg-gray-100 rounded-lg flex items-center justify-center border border-gray-300">
              {videoUrl ? (
                <VideoPlayer url={videoUrl} />
              ) : hideActions ? (
                <div>
                  <p className="text-sm text-gray-500">Not Found Video</p>
                </div>
              ) : (
                <Button variant="outline" onClick={() => onEdit(type, "")}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Video
                </Button>
              )}
            </div>
          </div>
        </CardContent>

        {videoUrl && !hideActions && (
          <div className="absolute top-0 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PiDotsThreeOutlineVerticalFill />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="mr-4">
                <DropdownMenuItem onClick={() => onEdit(type, videoUrl)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </Card>
  );
};
