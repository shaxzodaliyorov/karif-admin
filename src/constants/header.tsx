import { IoGrid, IoLogOut, IoPerson, IoSettings } from "react-icons/io5";

export const HEADER_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Announcement",
    href: "/announcements",
  },
  {
    label: "Service",
    href: "/services",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];

export const HEADER_DROPDOWN = [
  {
    label: "Dashboard",
    value: "/dashboard",
    icon: <IoGrid />,
  },
  {
    label: "Profile",
    value: "/profile",
    icon: <IoPerson />,
  },
  {
    label: "Settings",
    value: "/settings",
    icon: <IoSettings />,
  },
  {
    label: "Logout",
    value: "/logout",
    icon: <IoLogOut />,
  },
];
