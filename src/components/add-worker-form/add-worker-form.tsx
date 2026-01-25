/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUpload } from "@/components/file-upload";
import { DatePicker } from "@/components/common/date-picker/date-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHandleRequest } from "@/hooks/use-handle-request";
import { useAddWorkerMutation } from "@/store/workerad/workerad.api";
import { toast } from "sonner";
import { format } from "date-fns";
import { COUNTRIES } from "@/constants/countries";
import { Button } from "../common/button/button";
import { useNavigate } from "react-router-dom";

export interface FormData {
  // Personal Information
  name: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  alternativePhoneNumber?: string;

  // Address Information
  country: string;
  address: string;

  // Physical Information
  height?: number;
  weight?: number;
  shoeSize?: number;
  bloodGroup?: string;

  // Medical Information
  allergies?: string;
  dietInformation?: string;

  // Personal Details
  religion?: string;
  marital?: string;
  remarried?: boolean;
  typeOfPropertyOwned?: string;

  // Emergency Contact
  relFullName?: string;
  relPhoneNumber?: string;
  relDateOfBirth?: string;
  relationship?: string;

  // Education
  collegeName?: string;
  collageMajor?: string;
  collageStartDate?: string;
  collageGraduationDate?: string;
  qualification?: string;

  // Video Files
  interviewVideo?: string;
  skillsVerificationVideo?: string;
  experienceVideo?: string;

  // Other Files
  photoRegistration?: string;
  graduationCertificate?: string;
  cv?: string;

  // Universities (Array)
  universities: Array<{
    highestDegree: string;
    universityName: string;
    major: string;
    startDate: string;
    graduationDate: string;
  }>;

  // Foreign Experiences (Array)
  foreignExperiences: Array<{
    visitedCountry: string;
    durationOfVisit: string;
    purpose: string;
    file?: string;
  }>;

  // Language Proficiencies (Array)
  languageProficiencies: Array<{
    language: string;
    proficiencyLevel: string;
    speakingLevel: string;
    writingAndReadingLevel: string;
    file?: string;
  }>;

  // Professional Certificates (Array)
  professionalCertificates: Array<{
    certificateType: string;
    issuingInstitution: string;
    issueDate: string;
    file?: string;
  }>;

  workplaceInformation: Array<{
    companyName: string;
    startDate: string;
    workingPeriod: number;
    field: string;
    position: string;
    file?: string;
  }>;
}

export function AddWorkerForm() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      universities: [
        {
          highestDegree: "",
          universityName: "",
          major: "",
          startDate: "",
          graduationDate: "",
        },
      ],
      foreignExperiences: [
        { visitedCountry: "", durationOfVisit: "", purpose: "", file: "" },
      ],
      languageProficiencies: [
        {
          language: "",
          proficiencyLevel: "",
          speakingLevel: "",
          writingAndReadingLevel: "",
          file: "",
        },
      ],
      professionalCertificates: [
        {
          certificateType: "",
          issuingInstitution: "",
          issueDate: "",
          file: "",
        },
      ],
      workplaceInformation: [
        {
          companyName: "",
          startDate: "",
          workingPeriod: 0,
          field: "",
          position: "",
          file: "",
        },
      ],
    },
  });

  const handleRequest = useHandleRequest();
  const navigate = useNavigate();
  const [addWorker, { isLoading }] = useAddWorkerMutation();

  const {
    fields: universityFields,
    append: appendUniversity,
    remove: removeUniversity,
  } = useFieldArray({
    control,
    name: "universities",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "foreignExperiences",
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languageProficiencies",
  });

  const {
    fields: certificateFields,
    append: appendCertificate,
    remove: removeCertificate,
  } = useFieldArray({
    control,
    name: "professionalCertificates",
  });

  const {
    fields: workplaceFields,
    append: appendWorkplace,
    remove: removeWorkplace,
  } = useFieldArray({
    control,
    name: "workplaceInformation",
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    const isMeaningfulValue = (value: unknown) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim().length > 0;
      if (typeof value === "number") return value !== 0;
      return true;
    };

    const filterEmptyItems = <T extends Record<string, unknown>>(
      items: T[],
    ) => {
      return items.filter((item) =>
        Object.values(item).some(isMeaningfulValue),
      );
    };

    const payloadData = {
      ...data,
      universities: filterEmptyItems(data?.universities || []),
      foreignExperiences: filterEmptyItems(data?.foreignExperiences || []),
      languageProficiencies: filterEmptyItems(
        data?.languageProficiencies || [],
      ),
      professionalCertificates: filterEmptyItems(
        data?.professionalCertificates || [],
      ),
      workplaceInformation: filterEmptyItems(data?.workplaceInformation || []),
    };

    await handleRequest({
      request: async () => {
        const res = await addWorker(payloadData as any);
        return res;
      },
      onSuccess: () => {
        toast.success("Worker added successfully");
        navigate("/workers");
      },
    });
  };

  const handleSingleDateChange =
    (onChange: (value: string) => void) => (date: Date | undefined) => {
      onChange(date ? format(date, "yyyy-MM-dd") : "");
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full p-0 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label>Full Name</Label>
                  <Input {...field} placeholder="Enter your full name" />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label>Email</Label>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Date of Birth</Label>
                  <DatePicker
                    mode="single"
                    value={field.value}
                    onChange={(value) => {
                      const date = value instanceof Date ? value : undefined;
                      handleSingleDateChange(field.onChange)(date);
                    }}
                  />
                </div>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label>Phone Number</Label>
                  <Input {...field} placeholder="+1234567890" />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="alternativePhoneNumber"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Alternative Phone Number</Label>
                  <Input {...field} placeholder="+1234567890" />
                </div>
              )}
            />

            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label>Country</Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {COUNTRIES.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {error && (
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Address</Label>
                <Input {...field} placeholder="Enter your address" />
              </div>
            )}
          />
        </CardContent>
      </Card>

      {/* Physical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <Controller
              name="height"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Height (cm)</Label>
                  <Input {...field} type="number" placeholder="170" />
                </div>
              )}
            />

            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Weight (kg)</Label>
                  <Input {...field} type="number" placeholder="70" />
                </div>
              )}
            />

            <Controller
              name="shoeSize"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Shoe Size</Label>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value) || ""}
                    defaultValue={String(field.value) || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select shoe size" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => i + 35).map(
                        (size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Blood Group</Label>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value) || ""}
                    defaultValue={String(field.value) || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="a+">A+</SelectItem>
                        <SelectItem value="a-">A-</SelectItem>
                        <SelectItem value="b+">B+</SelectItem>
                        <SelectItem value="b-">B-</SelectItem>
                        <SelectItem value="o+">O+</SelectItem>
                        <SelectItem value="o-">O-</SelectItem>
                        <SelectItem value="ab+">AB+</SelectItem>
                        <SelectItem value="ab-">AB-</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Medical & Personal Details */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Medical & Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Allergies</Label>
                <Input {...field} placeholder="List any allergies" />
              </div>
            )}
          />

          <Controller
            name="dietInformation"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Diet Information</Label>
                <Input
                  {...field}
                  placeholder="Dietary restrictions or preferences"
                />
              </div>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="religion"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Religion</Label>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value) || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectContent>
                        <SelectItem value="Islam">Islam</SelectItem>
                        <SelectItem value="Christianity">
                          Christianity
                        </SelectItem>
                        <SelectItem value="Hinduism">Hinduism</SelectItem>
                        <SelectItem value="Buddhism">Buddhism</SelectItem>
                        <SelectItem value="No Religion">No Religion</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="marital"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Marital Status</Label>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value) || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="typeOfPropertyOwned"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Type of Property Owned</Label>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value) || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type of Property Owned" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="remarried"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Remarried</Label>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value) || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Remarried" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="relFullName"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Full Name</Label>
                  <Input {...field} placeholder="Contact's full name" />
                </div>
              )}
            />

            <Controller
              name="relationship"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Relationship</Label>
                  <Select
                    onValueChange={field.onChange}
                    value={String(field.value) || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select relationship" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Sister">Sister</SelectItem>
                        <SelectItem value="Brother">Brother</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name="relPhoneNumber"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Phone Number</Label>
                  <Input {...field} placeholder="+1234567890" />
                </div>
              )}
            />

            <Controller
              name="relDateOfBirth"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Date of Birth</Label>
                  <DatePicker
                    mode="single"
                    value={field.value}
                    onChange={(value) => {
                      const date = value instanceof Date ? value : undefined;
                      handleSingleDateChange(field.onChange)(date);
                    }}
                  />
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Education Information */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Education Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="collegeName"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>College Name</Label>
                  <Input {...field} placeholder="Enter college name" />
                </div>
              )}
            />

            <Controller
              name="collageMajor"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Major</Label>
                  <Input {...field} placeholder="Enter major" />
                </div>
              )}
            />

            <Controller
              name="collageStartDate"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Start Date</Label>
                  <DatePicker
                    mode="single"
                    value={field.value}
                    onChange={(value) => {
                      const date = value instanceof Date ? value : undefined;
                      handleSingleDateChange(field.onChange)(date);
                    }}
                  />
                </div>
              )}
            />

            <Controller
              name="collageGraduationDate"
              control={control}
              render={({ field }) => (
                <div>
                  <Label>Graduation Date</Label>
                  <DatePicker
                    mode="single"
                    value={field.value}
                    onChange={(value) => {
                      const date = value instanceof Date ? value : undefined;
                      handleSingleDateChange(field.onChange)(date);
                    }}
                  />
                </div>
              )}
            />

            <Controller
              name="qualification"
              control={control}
              render={({ field }) => (
                <FileUpload
                  label="Qualification "
                  name="qualification"
                  value={field.value}
                  onChange={field.onChange}
                  accept={["application/pdf"]}
                />
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Universities */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Universities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {universityFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">University {index + 1}</h4>
                {universityFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeUniversity(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`universities.${index}.highestDegree`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Highest Degree</Label>
                      <Input
                        {...field}
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                  )}
                />

                <Controller
                  name={`universities.${index}.universityName`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>University Name</Label>
                      <Input {...field} placeholder="Enter university name" />
                    </div>
                  )}
                />

                <Controller
                  name={`universities.${index}.major`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Major</Label>
                      <Input {...field} placeholder="Enter major" />
                    </div>
                  )}
                />

                <Controller
                  name={`universities.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Start Date</Label>
                      <DatePicker
                        mode="single"
                        value={field.value}
                        onChange={(value) => {
                          const date =
                            value instanceof Date ? value : undefined;
                          handleSingleDateChange(field.onChange)(date);
                        }}
                      />
                    </div>
                  )}
                />

                <Controller
                  name={`universities.${index}.graduationDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Graduation Date</Label>
                      <DatePicker
                        mode="single"
                        value={field.value}
                        onChange={(value) => {
                          const date =
                            value instanceof Date ? value : undefined;
                          handleSingleDateChange(field.onChange)(date);
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendUniversity({
                highestDegree: "",
                universityName: "",
                major: "",
                startDate: "",
                graduationDate: "",
              })
            }
          >
            + Add University
          </Button>
        </CardContent>
      </Card>

      {/* File Uploads Section */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Document Uploads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="cv"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="CV"
                name="cv"
                value={field.value}
                onChange={field.onChange}
                accept={["application/pdf"]}
              />
            )}
          />

          <Controller
            name="photoRegistration"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Photo (Registration)"
                name="photoRegistration"
                value={field.value}
                onChange={field.onChange}
                accept={["image/jpeg", "image/png"]}
              />
            )}
          />

          <Controller
            name="graduationCertificate"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Graduation Certificate"
                name="graduationCertificate"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Video Uploads */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Video Uploads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Controller
            name="interviewVideo"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Interview Video"
                name="interviewVideo"
                value={field.value}
                onChange={field.onChange}
                accept={["video/mp4", "video/quicktime"]}
              />
            )}
          />

          <Controller
            name="skillsVerificationVideo"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Skills Verification Video"
                name="skillsVerificationVideo"
                value={field.value}
                onChange={field.onChange}
                accept={["video/mp4", "video/quicktime"]}
              />
            )}
          />

          <Controller
            name="experienceVideo"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Experience Video"
                name="experienceVideo"
                value={field.value}
                onChange={field.onChange}
                accept={["video/mp4", "video/quicktime"]}
              />
            )}
          />
        </CardContent>
      </Card>

      {/* Foreign Experiences */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Foreign Experiences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {experienceFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Experience {index + 1}</h4>
                {experienceFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`foreignExperiences.${index}.visitedCountry`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Visited Country</Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.label}
                            >
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <Controller
                  name={`foreignExperiences.${index}.durationOfVisit`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Duration of Visit</Label>
                      <Input {...field} placeholder="e.g., 3 months" />
                    </div>
                  )}
                />

                <Controller
                  name={`foreignExperiences.${index}.purpose`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Purpose</Label>
                      <Input {...field} placeholder="Reason for visit" />
                    </div>
                  )}
                />

                <Controller
                  name={`foreignExperiences.${index}.file`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <FileUpload
                        label="Supporting Document"
                        name={`foreignExperience-${index}`}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendExperience({
                visitedCountry: "",
                durationOfVisit: "",
                purpose: "",
                file: "",
              })
            }
          >
            + Add Experience
          </Button>
        </CardContent>
      </Card>

      {/* Language Proficiencies */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Language Proficiencies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {languageFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Language {index + 1}</h4>
                {languageFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeLanguage(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`languageProficiencies.${index}.language`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Language</Label>
                      <Input {...field} placeholder="e.g., English, Spanish" />
                    </div>
                  )}
                />

                <Controller
                  name={`languageProficiencies.${index}.proficiencyLevel`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Proficiency Level</Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="beginner">
                              Beginner (A1)
                            </SelectItem>
                            <SelectItem value="elementary">
                              Elementary (A2)
                            </SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate (B1)
                            </SelectItem>
                            <SelectItem value="upper-intermediate">
                              Upper-Intermediate (B2)
                            </SelectItem>
                            <SelectItem value="advanced">
                              Advanced (C1)
                            </SelectItem>
                            <SelectItem value="proficient">
                              Proficient (C2)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <Controller
                  name={`languageProficiencies.${index}.speakingLevel`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Speaking Level</Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="beginner">
                              Beginner (A1)
                            </SelectItem>
                            <SelectItem value="elementary">
                              Elementary (A2)
                            </SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate (B1)
                            </SelectItem>
                            <SelectItem value="upper-intermediate">
                              Upper-Intermediate (B2)
                            </SelectItem>
                            <SelectItem value="advanced">
                              Advanced (C1)
                            </SelectItem>
                            <SelectItem value="proficient">
                              Proficient (C2)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <Controller
                  name={`languageProficiencies.${index}.writingAndReadingLevel`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Writing & Reading Level</Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select proficiency level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="beginner">
                              Beginner (A1)
                            </SelectItem>
                            <SelectItem value="elementary">
                              Elementary (A2)
                            </SelectItem>
                            <SelectItem value="intermediate">
                              Intermediate (B1)
                            </SelectItem>
                            <SelectItem value="upper-intermediate">
                              Upper-Intermediate (B2)
                            </SelectItem>
                            <SelectItem value="advanced">
                              Advanced (C1)
                            </SelectItem>
                            <SelectItem value="proficient">
                              Proficient (C2)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                />

                <Controller
                  name={`languageProficiencies.${index}.file`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <FileUpload
                        label="Certificate"
                        name={`language-${index}`}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendLanguage({
                language: "",
                proficiencyLevel: "",
                speakingLevel: "",
                writingAndReadingLevel: "",
                file: "",
              })
            }
          >
            + Add Language
          </Button>
        </CardContent>
      </Card>

      {/* Professional Certificates */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Professional Certificates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {certificateFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Certificate {index + 1}</h4>
                {certificateFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCertificate(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`professionalCertificates.${index}.certificateType`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Certificate Type</Label>
                      <Input {...field} placeholder="e.g., AWS, Google Cloud" />
                    </div>
                  )}
                />

                <Controller
                  name={`professionalCertificates.${index}.issuingInstitution`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Issuing Institution</Label>
                      <Input {...field} placeholder="Institution name" />
                    </div>
                  )}
                />

                <Controller
                  name={`professionalCertificates.${index}.issueDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Issue Date</Label>
                      <DatePicker
                        mode="single"
                        value={field.value}
                        onChange={(value) => {
                          const date =
                            value instanceof Date ? value : undefined;
                          handleSingleDateChange(field.onChange)(date);
                        }}
                      />
                    </div>
                  )}
                />

                <Controller
                  name={`professionalCertificates.${index}.file`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <FileUpload
                        label="Certificate File"
                        name={`certificate-${index}`}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendCertificate({
                certificateType: "",
                issuingInstitution: "",
                issueDate: "",
                file: "",
              })
            }
          >
            + Add Certificate
          </Button>
        </CardContent>
      </Card>

      {/* Workplace Information */}
      <Card className="shadow-none border">
        <CardHeader>
          <CardTitle>Workplace Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {workplaceFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-3">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Workplace {index + 1}</h4>
                {workplaceFields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeWorkplace(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={`workplaceInformation.${index}.companyName`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Company Name</Label>
                      <Input {...field} placeholder="Company name" />
                    </div>
                  )}
                />

                <Controller
                  name={`workplaceInformation.${index}.position`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Position</Label>
                      <Input {...field} placeholder="Job title" />
                    </div>
                  )}
                />

                <Controller
                  name={`workplaceInformation.${index}.field`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Field</Label>
                      <Input {...field} placeholder="Industry/field" />
                    </div>
                  )}
                />

                <Controller
                  name={`workplaceInformation.${index}.workingPeriod`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Working Period (months)</Label>
                      <Input {...field} type="number" placeholder="12" />
                    </div>
                  )}
                />

                <Controller
                  name={`workplaceInformation.${index}.startDate`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label>Start Date</Label>
                      <DatePicker
                        mode="single"
                        value={field.value}
                        onChange={(value) => {
                          const date =
                            value instanceof Date ? value : undefined;
                          handleSingleDateChange(field.onChange)(date);
                        }}
                      />
                    </div>
                  )}
                />

                <Controller
                  name={`workplaceInformation.${index}.file`}
                  control={control}
                  render={({ field }) => (
                    <div>
                      <FileUpload
                        label="Work Certificate"
                        name={`workplace-${index}`}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendWorkplace({
                companyName: "",
                startDate: "",
                workingPeriod: 0,
                field: "",
                position: "",
                file: "",
              })
            }
          >
            + Add Workplace
          </Button>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" className="w-full" size="lg" loading={isLoading}>
        Submit Registration
      </Button>
    </form>
  );
}
