import { HEADER_LINKS } from "@/constants";
import { Link } from "react-router-dom";

export const Header = () => (
  <header className="w-full fixed top-0 left-0 bg-white z-[999] border-b">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between h-[70px]">
        <div className="flex-shrink-0 min-w-[200px]">
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

        {/* Right Side Buttons - Fixed width */}
        <div className="flex-shrink-0 flex items-center space-x-2 min-w-[180px] justify-end">
          <div className="hidden sm:block">
            <span className="sr-only">Language</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);
