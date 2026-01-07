import { UserAvatar } from "../common/avatar";
import { Dropdown } from "../common/drop-down";
import { IoGrid, IoLogOut, IoPerson, IoSettings } from "react-icons/io5";
import { useLogout } from "@/hooks/use-logout";
import { AlertModal } from "../common/alert-modal/alert-modal";
import { useState } from "react";

export const DashboardHeader = () => {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full border-b h-[60px] bg-white fixed top-0 z-10 left-0">
      <div className="flex items-center px-10 justify-end h-full">
        <Dropdown
          options={[
            {
              label: "Dashboard",
              icon: <IoGrid />,
            },
            {
              label: "Profile",
              icon: <IoPerson />,
            },
            {
              label: "Settings",
              icon: <IoSettings />,
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
