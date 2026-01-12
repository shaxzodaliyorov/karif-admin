import { UserAvatar } from "../common/avatar";
import { Dropdown } from "../common/drop-down";
import { IoGrid, IoLogOut, IoPerson, IoSettings } from "react-icons/io5";
import { useLogout } from "@/hooks/use-logout";
import { AlertModal } from "../common/alert-modal/alert-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="w-full border-b h-[60px] bg-white fixed top-0 z-10 left-0">
      <div className="flex items-center px-10 justify-end h-full">
        <Dropdown
          options={[
            {
              label: "Dashboard",
              icon: <IoGrid />,
              onClick: () => navigate("/dashboard"),
            },
            {
              label: "Profile",
              icon: <IoPerson />,
              onClick: () => navigate("/my-information"),
            },
            {
              label: "Settings",
              icon: <IoSettings />,
              onClick: () => navigate("/settings"),
            },
            {
              label: "Logout",
              icon: <IoLogOut />,
              onClick: () => setIsOpen(true),
            },
          ]}
        >
          <button className="cursor-pointer">
            <UserAvatar fallback={"SH"} />
          </button>
        </Dropdown>
      </div>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => logout()}
        title="Logout"
        description="Are you sure you want to logout?"
      />
    </header>
  );
};
