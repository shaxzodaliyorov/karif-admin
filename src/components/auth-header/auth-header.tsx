import { ChevronLeft } from "lucide-react";
import { Button } from "../common/button/button";
import { SwitchLanguage } from "../switch-language";
import { useNavigate } from "react-router-dom";

export const AuthHeader = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full border-b py-2">
        <div className="container flex justify-between">
          <Button onClick={() => navigate("/")}>
            <ChevronLeft /> Back To Home
          </Button>
          <SwitchLanguage />
        </div>
      </div>
    </div>
  );
};
