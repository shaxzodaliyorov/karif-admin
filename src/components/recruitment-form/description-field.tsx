/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/recruitment/DescriptionField.tsx
import { Controller } from "react-hook-form";

interface DescriptionFieldProps {
  control: any;
}

export const DescriptionField = ({ control }: DescriptionFieldProps) => {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        기타 설명
      </label>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            rows={4}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
    </div>
  );
};
