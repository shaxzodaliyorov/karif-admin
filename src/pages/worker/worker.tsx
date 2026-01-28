import { PersonalDetails, WorkplaceInformationInfo } from "@/components";
import { CollegeInformation } from "@/components/college-information";
import { LanguageProficiency } from "@/components/language-proficiency";
import { PageHeader } from "@/components/page-header";
import ProfessionalCertificates from "@/components/professional-certificate/professional-certificate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoUpload } from "@/components/video-upload/video-upload";
import { useQuery } from "@/hooks/useQuery";
import { useGetWorkerAdByIdQuery } from "@/store/workerad/workerad.api";
import {
  User,
  Briefcase,
  GraduationCap,
  Languages,
  Award,
  Video,
  Loader2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const WorkerPage = () => {
  const query = useQuery();

  const { id } = useParams();
  const { data: { data: workerData } = {}, isLoading } =
    useGetWorkerAdByIdQuery(String(id));

  const navigate = useNavigate();

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

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader2 className="w-5 h-5 animate-spin" />
      </div>
    );
  }

  return (
    <section>
      <PageHeader
        title={`Worker Information - ${workerData?.name || ""}`}
        showBackButton
        onBack={() => navigate(-1)}
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
              <PersonalDetails user={workerData} />
            </TabsContent>
            <TabsContent value="workplace-information" className="mt-0">
              <WorkplaceInformationInfo userInfo={workerData} hideActions />
            </TabsContent>
            <TabsContent value="college-information" className="mt-0">
              <CollegeInformation userInfo={workerData} hideActions />
            </TabsContent>
            <TabsContent value="language-proficiency" className="mt-0">
              <LanguageProficiency userInfo={workerData} hideActions />
            </TabsContent>
            <TabsContent value="professional-certificate" className="mt-0">
              <ProfessionalCertificates userInfo={workerData} hideActions />
            </TabsContent>
            <TabsContent value="video" className="mt-0">
              <VideoUpload userInfo={workerData} hideActions />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};
