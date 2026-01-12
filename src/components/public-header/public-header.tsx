import { UserAvatar } from "@/components/common/avatar";
import { Button } from "@/components/common/button/button";
import { HEADER_LINKS } from "@/constants";
import { useGetUser } from "@/hooks/use-get-user";
import { useLogout } from "@/hooks/use-logout";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertModal } from "../common/alert-modal";
import { IoGrid, IoLogOut, IoPerson, IoSettings } from "react-icons/io5";
import { Dropdown } from "../common/drop-down";

export const PublicHeader = () => {
  const user = useGetUser();
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full fixed top-0 left-0 bg-white z-[999] border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[70px]">
          <div className="min-w-[200px]">
            <Link to="/" className="flex items-center">
              <img
                src="/images/header_1.png"
                className="w-[34.87px] h-[34.87px]"
                alt="Logo 1"
              />
              <img
                src="/images/header_2.png"
                className="w-[78.46px] h-[25.67px] mx-2"
                alt="Logo 2"
              />
              <img
                src="/images/header_3.png"
                className="w-[56.67px] h-[23.25px]"
                alt="Logo 3"
              />
            </Link>
          </div>

          <div className="flex-1 mx-4 px-2">
            <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide py-2">
              {HEADER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-xs sm:text-sm md:text-base text-gray-800 hover:text-primary transition-colors px-2 py-1.5 whitespace-nowrap shrink-0 rounded hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 min-w-[180px] justify-end">
            {user ? (
              <>
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
                  <button>
                    <UserAvatar src={"SH"} fallback={"SH"} />
                  </button>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button>Login</Button>
                </Link>
                <Link to="/role">
                  <Button variant="outline">Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
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
