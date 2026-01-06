import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function UserAvatar({
  src,
  fallback,
  className,
  size = "md",
}: {
  src?: string;
  fallback: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={src} alt="User avatar" />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

export function UserCard({
  name,
  username,
  email,
  role,
  avatarSrc,
  avatarFallback,
  status = "online",
  description,
  className,
}: {
  name: string;
  username?: string;
  email?: string;
  role?: string;
  avatarSrc?: string;
  avatarFallback: string;
  status?: "online" | "offline" | "away";
  description?: string;
  className?: string;
}) {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    away: "bg-yellow-500",
  };

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="relative">
          <UserAvatar src={avatarSrc} fallback={avatarFallback} size="lg" />
          <span
            className={cn(
              "absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white",
              statusColors[status]
            )}
          />
        </div>
        <div className="flex-1">
          <CardTitle className="text-lg">{name}</CardTitle>
          {username && <CardDescription>@{username}</CardDescription>}
        </div>
        {role && <Badge variant="secondary">{role}</Badge>}
      </CardHeader>
      <CardContent className="space-y-2">
        {email && <p className="text-sm text-muted-foreground">{email}</p>}
        {description && <p className="text-sm">{description}</p>}
      </CardContent>
    </Card>
  );
}
