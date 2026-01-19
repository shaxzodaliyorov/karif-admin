import { PageHeader } from "@/components/page-header";
import { PersonalDetails } from "@/components/personal-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetUser } from "@/hooks/use-get-user";
import { useQuery } from "@/hooks/useQuery";
import {
  Award,
  Briefcase,
  GraduationCap,
  Languages,
  User,
  Video,
} from "lucide-react";
import { useState } from "react";
import { EditPersonalModal } from "./edit-personal-modal";
import { EditEmergencyContactModal } from "./edit-emergency-contact-modal";
import { WorkplaceInformationInfo } from "@/components";
import { CollegeInformation } from "@/components/college-information";
import { LanguageProficiency } from "@/components/language-proficiency";
import ProfessionalCertificates from "@/components/professional-certificate/professional-certificate";
import { VideoUpload } from "@/components/video-upload/video-upload";

export const WorkerMyInformation = () => {
  const query = useQuery();
  const user = useGetUser();
  const [open, setOpen] = useState(false);
  const [editPersonalOpen, setEditPersonalOpen] = useState(false);
  const TAB_ITEMS = [
    {
      value: "emergency-contact",
      title: "Emergency Contact",
      icon: <User className="h-4 w-4" />,
    },
    {
      value: "workplace-information",
      title: "Workplace Info",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      value: "college-information",
      title: "College",
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      value: "language-proficiency",
      title: "Language Proficiency",
      icon: <Languages className="h-4 w-4" />,
    },
    {
      value: "professional-certificate",
      title: "Professional Certificate",
      icon: <Award className="h-4 w-4" />,
    },

    {
      value: "video",
      title: "Video",
      icon: <Video className="h-4 w-4" />,
    },
  ];

  const currentTab = query.get("tab") || "emergency-contact";

  const handleTabChange = (value: string) => {
    query.set("tab", value);
  };

  return (
    <div>
      <PageHeader
        title="Worker My Information"
        description="View and manage your personal information here."
      />
      <div className="w-full">
        <Tabs
          defaultValue={currentTab}
          onValueChange={handleTabChange}
          orientation="vertical"
          className="flex-row"
        >
          <div className="w-80">
            <TabsList className="flex flex-col h-auto w-full bg-transparent p-2 space-y-1">
              {TAB_ITEMS.map((item) => (
                <TabsTrigger
                  key={item.value}
                  value={item.value}
                  className="w-full justify-start gap-3 px-4 py-3 rounded-lg text-left data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50 transition-all duration-200"
                >
                  <div className="flex items-center gap-3 w-full">
                    {item.icon}
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.title}</div>
                    </div>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="flex-1">
            <TabsContent value="emergency-contact" className="mt-0">
              <PersonalDetails
                user={user}
                onEditPersonal={() => setOpen(true)}
                onEditEmergency={() => setEditPersonalOpen(true)}
              />
            </TabsContent>
            <TabsContent value="workplace-information" className="mt-0">
              <WorkplaceInformationInfo />
            </TabsContent>
            <TabsContent value="college-information" className="mt-0">
              <CollegeInformation />
            </TabsContent>
            <TabsContent value="language-proficiency" className="mt-0">
              <LanguageProficiency />
            </TabsContent>
            <TabsContent value="professional-certificate" className="mt-0">
              <ProfessionalCertificates />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
              <VideoUpload />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <EditPersonalModal open={open} onOpenChange={() => setOpen(false)} />
      <EditEmergencyContactModal
        open={editPersonalOpen}
        onOpenChange={() => setEditPersonalOpen(false)}
      />
    </div>
  );
};
