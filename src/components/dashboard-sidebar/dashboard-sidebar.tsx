import { useGetUser } from "@/hooks/use-get-user";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Settings,
  Package,
  UserSearch,
  UserCheck,
  Loader2,
} from "lucide-react";
import { IoGrid } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
type Role = "admin" | "agency" | "worker" | "company" | "korean_agency";
import { FaListCheck } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { PiBagSimpleFill } from "react-icons/pi";
import { TbWorldDown } from "react-icons/tb";
import { TbWorldDownload } from "react-icons/tb";
import { useUserQuery } from "@/store/auth/auth.api";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    roles: ["admin", "agency", "worker", "company", "korean_agency"],
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: IoGrid,
    roles: ["admin", "agency", "worker", "company", "korean_agency"],
  },
  {
    label: "New Employment",
    href: "/employment",
    icon: PiBagSimpleFill,
    roles: ["company"],
  },
  {
    label: "My Applications",
    href: "/my-applications",
    icon: FaListCheck,
    roles: ["company"],
  },
  {
    label: "Workers",
    href: "/workers",
    icon: Users,
    roles: ["agency"],
  },
  {
    label: "Recruitment Notice",
    href: "/recruitment-notice",
    icon: UserSearch,
    roles: ["agency"],
  },
  {
    label: "Applied Recruitment Notice",
    href: "/applied-recruitment-notice",
    icon: UserCheck,
    roles: ["agency"],
  },
  {
    label: "Foreign Agency",
    href: "/foreign-agency",
    icon: TbWorldDownload,
    roles: ["korean_agency"],
  },
  {
    label: "Application Status",
    href: "/application-status",
    icon: TbWorldDown,
    roles: ["worker"],
  },
  {
    label: "My Information",
    href: "/my-information",
    icon: FaInfoCircle,
    roles: ["worker", "company", "korean_agency"],
  },
  {
    label: "New Application",
    href: "/new-application",
    icon: Package,
    roles: ["worker"],
  },
  {
    label: "My Inbox",
    href: "/inbox ",
    icon: Package,
    roles: ["worker", "company", "korean_agency"],
  },
  {
    label: "My consultation",
    href: "/consultation",
    icon: TbWorld,
    roles: ["worker", "company"],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "agency", "worker", "company", "korean_agency"],
  },
];

export const DashboardSidebar = () => {
  const user = useGetUser();
  const location = useLocation();
  const { isLoading } = useUserQuery();

  const userRole = user?.role as Role | undefined;

  const filteredItems = menuItems.filter((item) =>
    userRole ? item.roles.includes(userRole) : false
  );

  return (
    <div className="w-[300px] bg-white border-r h-screen fixed top-0 left-0 z-11">
      <div>
        <div className="flex pt-5 items-center justify-center">
          <Link to="/dashboard">
            <img
              src="https://thumbs.dreamstime.com/b/demo-demo-icon-139882881.jpg"
              alt=""
              className="w-20 h-20"
            />
          </Link>
        </div>
      </div>
      <div className="p-6 w-full h-full">
        <h2 className="text-xl font-semibold mb-6">Menu</h2>
        {isLoading ? (
          <div className="h-[300px] flex w-full justify-center items-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <nav className="space-y-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex line-clamp-1 items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="line-clamp-1">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};
