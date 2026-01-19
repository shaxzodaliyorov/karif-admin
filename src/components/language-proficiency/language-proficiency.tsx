import { TbEdit, TbInfoCircle } from "react-icons/tb";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Languages, MessageCircle, PenTool } from "lucide-react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useGetUser } from "@/hooks/use-get-user";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { getProficiencyFullName } from "@/utils/getProficiencyFullName";
import { getProficiencyColor } from "@/utils/getProficiencyColor";
import { getProficiencyProgress } from "@/utils/getProficiencyProgress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { getLanguageFlag } from "@/utils/getLanguageFlag";
import { AddLanguageModal } from "./add-language-modal";
import { EditLanguageModal } from "./edit-language-modal";
import { toast } from "sonner";
import { useWorkerUserUpdateMutation } from "@/store/auth/auth.api";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { AlertModal } from "../common/alert-modal";

interface LanguageProficiencyProps {
  userInfo?: any;
  hideActions?: boolean;
}

export const LanguageProficiency = ({
  userInfo,
  hideActions,
}: LanguageProficiencyProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditIndex, setIsEditIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<null | number>(null);
  const userData: any = useGetUser();
  const user: any = userInfo || userData;
  const [updateUser, { isLoading: loading }] = useWorkerUserUpdateMutation();
  const handleRequest = useHandleRequest();

  const onConfirmDelete = async () => {
    const languageProficiencies = [...(user?.languageProficiencies ?? [])];
    languageProficiencies.splice(deleteIndex ?? -1, 1);
    await handleRequest({
      request: async () => {
        const response = await updateUser({
          languageProficiencies: languageProficiencies as any[],
        });
        return response;
      },
      onSuccess: () => {
        toast.success("Language proficiency deleted successfully");
        setDeleteIndex(null);
      },
    });
  };

  return (
    <div>
      <Card className="shadow-none rounded-none border-none px-0">
        <CardHeader className="border-b px-0 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                <Languages className="h-5 w-5 text-blue-600" />
                Language Proficiency
              </CardTitle>
            </div>
            {!hideActions && (
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                variant="outline"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Language
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-0 p-6 px-0">
          {/* Language Proficiency List */}
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-1">
              {!user?.languageProficiencies?.length ? (
                <div className="flex items-center h-40 justify-center gap-y-4 flex-col w-full">
                  <div>
                    <TbInfoCircle className="h-6 w-6 text-gray-500 mr-2" />
                  </div>
                  <p className="text-sm text-gray-600">
                    No language proficiencies added yet.
                  </p>
                </div>
              ) : (
                user?.languageProficiencies?.map(
                  (language: any, index: any) => (
                    <Card
                      key={`${index}-${language?.language}`}
                      className="border-l-4 border-l-blue-500"
                    >
                      <CardContent className="p-6 relative">
                        <div>
                          <div className="space-y-4">
                            {/* Language Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {getLanguageFlag(language.language)}
                                </span>
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900">
                                    {language.language}
                                  </h4>
                                </div>
                              </div>
                              <div className="text-right"></div>
                            </div>

                            {/* Proficiency Levels */}
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                    <MessageCircle className="h-3 w-3" />
                                    Speaking Level
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getProficiencyColor(
                                      language.speakingLevel,
                                    )}
                                  >
                                    {getProficiencyFullName(
                                      language.speakingLevel,
                                    )}
                                  </Badge>
                                </div>
                                <Progress
                                  value={getProficiencyProgress(
                                    language.speakingLevel,
                                  )}
                                  className="h-2"
                                />
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                    <PenTool className="h-3 w-3" />
                                    Writing and Reading Level
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getProficiencyColor(
                                      language?.writingAndReadingLevel,
                                    )}
                                  >
                                    {getProficiencyFullName(
                                      language?.writingAndReadingLevel,
                                    )}
                                  </Badge>
                                </div>
                                <Progress
                                  value={getProficiencyProgress(
                                    language?.writingAndReadingLevel,
                                  )}
                                  className="h-2"
                                />
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                    <Languages className="h-3 w-3" />
                                    Overall Proficiency
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={getProficiencyColor(
                                      language.proficiencyLevel,
                                    )}
                                  >
                                    {getProficiencyFullName(
                                      language.proficiencyLevel,
                                    )}
                                  </Badge>
                                </div>
                                <Progress
                                  value={getProficiencyProgress(
                                    language.proficiencyLevel,
                                  )}
                                  className="h-2"
                                />
                              </div>
                            </div>
                          </div>
                          {!hideActions && (
                            <div className="absolute top-[-15px] right-1">
                              <div className="absolute right-3 top-3">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                    >
                                      <PiDotsThreeOutlineVerticalFill className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => setIsEditIndex(index)}
                                    >
                                      <TbEdit className="mr-2 h-4 w-4" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => setDeleteIndex(index)}
                                      className="text-red-600 focus:text-red-600"
                                    >
                                      <RiDeleteBinLine className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <AddLanguageModal
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      <EditLanguageModal
        open={isEditIndex !== null}
        onOpenChange={() => setIsEditIndex(null)}
        index={isEditIndex ?? -1}
      />
      <AlertModal
        isOpen={deleteIndex !== null}
        onConfirm={onConfirmDelete}
        onClose={() => setDeleteIndex(null)}
        title="Delete Language"
        description="Are you sure you want to delete this language?"
        loading={loading}
      />
    </div>
  );
};
