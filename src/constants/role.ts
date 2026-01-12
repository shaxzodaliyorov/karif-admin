import { Briefcase, Building2, Users } from "lucide-react";

type RoleOption = {
  value: "company" | "agency" | "worker" | "korean-agency";
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const ROLE_OPTIONS: RoleOption[] = [
  {
    value: "company",
    title: "Company",
    subtitle:
      "This company is a legal entity that is responsible for the activities and resources of a group of individuals or organizations.",
    icon: Building2,
  },
  {
    value: "agency",
    title: "Agency",
    subtitle:
      "An agency is an organization that is responsible for the activities and resources of a group of individuals or organizations.",
    icon: Users,
  },
  {
    value: "korean-agency",
    title: "Korean Agency",
    subtitle:
      "Korean Agency - An online platform for registering Korean businesses.",
    icon: Users,
  },
  {
    value: "worker",
    title: "Worker",
    subtitle:
      "A worker is an individual who is responsible for the activities and resources of a group of individuals or organizations.",
    icon: Briefcase,
  },
];
