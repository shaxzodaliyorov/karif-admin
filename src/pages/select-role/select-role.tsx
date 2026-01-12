import { ROLE_OPTIONS } from "@/constants/role";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/common/button/button";
import { useNavigate } from "react-router-dom";

export const SelectRolePage = () => {
  const [selectedRole, setSelectedRole] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/register-${selectedRole}`);
  };
  return (
    <div className="h-[90vh] flex flex-col gap-y-10 items-center justify-center container">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {ROLE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedRole === option.value;

          return (
            <Card
              key={option.value}
              className={cn(
                "rounded-2xl shadow-sm transition-all hover:shadow-md cursor-pointer",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => setSelectedRole(option.value)}
            >
              <CardHeader className="text-center pb-2">
                <div className="mx-auto w-14 h-14 bg-muted rounded-full flex items-center justify-center p-2 mb-4">
                  <Icon
                    className={`w-8 h-8 text-foreground ${
                      isSelected ? "text-primary" : ""
                    }`}
                  />
                </div>

                <h3 className="text-lg font-semibold">{option.title}</h3>
              </CardHeader>

              <CardContent className="text-center pt-0">
                <p className="text-[12px] text-muted-foreground">
                  {option.subtitle}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="w-full flex items-center justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!selectedRole}
          className="w-[80%]"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
