/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

import { useUploadFileMutation } from '../store/upload/upload.api';

export interface UseFileUploadReturn {
  handleFileUpload: (file: File) => Promise<string | null>;
  isLoading: boolean;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      const result: any = await uploadFile(file).unwrap();
      if (result?.file_path) {
        return result.file_path;
      }
      return null;
    } catch (error: any) {
      toast.error('File upload failed', error.toString());
      return null;
    }
  };

  return { handleFileUpload, isLoading };
};
