/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";

interface DescriptionFieldProps {
  control: any;
}

export const DescriptionField = ({ control }: DescriptionFieldProps) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "link",
  ];

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        기타 설명
      </label>

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            theme="snow"
            value={value || ""}
            onChange={onChange}
            modules={modules}
            formats={formats}
            className="bg-white rounded-md h-full border border-gray-300 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
            style={{ minHeight: "160px" }}
          />
        )}
      />
    </div>
  );
};
