import {
  Phone,
  User,
  MapPin,
  Globe,
  Calendar,
  Check,
  Scale,
  Weight,
  Footprints,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TbEdit } from "react-icons/tb";
import dayjs from "dayjs";

interface PersonalDetailsProps {
  user: any | null;
  onEditPersonal?: () => void;
  onEditEmergency?: () => void;
}

export const PersonalDetails = ({
  user,
  onEditPersonal,
  onEditEmergency,
}: PersonalDetailsProps) => {
  if (!user) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-8 text-center text-gray-500">
          No user data available
        </CardContent>
      </Card>
    );
  }

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    color = "gray-400",
    isPhone = false,
    isVerified,
  }: {
    icon: any;
    label: string;
    value?: string | number | boolean | null;
    color?: string;
    isPhone?: boolean;
    isVerified?: boolean;
  }) => (
    <div className="space-y-1 border-b pb-3 last:border-b-0">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div className="flex items-center gap-2.5">
        <Icon className={`h-4 w-4 text-${color}`} />
        {isVerified !== undefined ? (
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-gray-900">
              {isVerified ? "Yes" : "No"}
            </span>
          </div>
        ) : isPhone && value ? (
          <a
            href={`tel:${value}`}
            className="text-green-600 hover:text-green-800 hover:underline font-medium"
          >
            {value as string}
          </a>
        ) : (
          <span className="text-base font-medium text-gray-900">
            {value ?? "—"}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">
      {/* Personal Information */}
      <Card className="shadow-none border-none">
        <CardHeader className="border-b bg-white flex flex-row items-center justify-between py-5">
          <CardTitle className="flex items-center gap-2.5 text-xl font-semibold">
            <User className="h-5 w-5 text-blue-600" />
            Personal Information
          </CardTitle>

          {onEditPersonal && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditPersonal}
              className="h-8 w-8"
            >
              <TbEdit size={18} />
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <InfoItem icon={User} label="Full Name" value={user.name} />
            <InfoItem
              icon={User}
              label="Gender"
              value={user.gender}
              color="purple-500"
            />
            <InfoItem
              icon={Phone}
              label="Phone Number"
              value={user.phoneNumber}
              isPhone
              color="green-500"
            />
            <InfoItem
              icon={Calendar}
              label="Date of Birth"
              value={
                user.dateOfBirth
                  ? dayjs(user.dateOfBirth).format("DD MMM YYYY")
                  : null
              }
            />
            <InfoItem
              icon={MapPin}
              label="Address"
              value={user.address}
              color="orange-600"
            />
            <InfoItem
              icon={Globe}
              label="Country"
              value={user.country}
              color="blue-600"
            />
            <InfoItem
              icon={Check}
              label="Verified"
              isVerified={user.isVerified}
            />
            <InfoItem
              icon={Scale}
              label="Height"
              value={user.height ? `${user.height} cm` : null}
              color="teal-600"
            />
            <InfoItem
              icon={Weight}
              label="Weight"
              value={user.weight ? `${user.weight} kg` : null}
              color="amber-600"
            />
            <InfoItem
              icon={Footprints}
              label="Shoe Size"
              value={user.shoeSize}
              color="gray-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="shadow-none border-none">
        <CardHeader className="border-b border-blue-100 bg-blue-50/40 flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
              <Phone className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-blue-900">
                Emergency Contact
              </CardTitle>
              <p className="text-sm text-blue-700 mt-0.5">
                Person to contact in case of emergency
              </p>
            </div>
          </div>

          {onEditEmergency && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditEmergency}
              className="h-8 w-8"
            >
              <TbEdit size={18} />
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-6 md:p-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex justify-between items-center py-1">
              <span className="text-sm font-medium text-blue-800">
                Full Name:
              </span>
              <span className="text-base font-semibold text-blue-950">
                {user.relFullName || "—"}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-sm font-medium text-blue-800">
                Relationship:
              </span>
              <span className="text-base font-medium text-blue-950">
                {user.relationship || "—"}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-sm font-medium text-blue-800">
                Date of Birth:
              </span>
              <span className="text-base font-medium text-blue-950">
                {user.relDateOfBirth
                  ? dayjs(user.relDateOfBirth).format("DD MMM YYYY")
                  : "—"}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-sm font-medium text-blue-800">
                Phone Number:
              </span>
              {user.relPhoneNumber ? (
                <a
                  href={`tel:${user.relPhoneNumber}`}
                  className="text-blue-700 font-semibold hover:text-blue-900 hover:underline"
                >
                  {user.relPhoneNumber}
                </a>
              ) : (
                <span className="text-gray-600">—</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
