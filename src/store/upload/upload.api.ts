import baseApi from '../api';

import type { UploadFileResponse } from './types';

export const UploadsExtendedEndpoints = baseApi.injectEndpoints({
  endpoints: build => ({
    uploadFile: build.mutation<UploadFileResponse, File>({
      query: file => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload/file',
          method: 'POST',
          body: formData,
        };
      },
    }),
    publicUploadFile: build.mutation<UploadFileResponse, File>({
      query: file => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload/file-public',
          method: 'POST',
          body: formData,
        };
      },
    }),
    uploadVideo: build.mutation<UploadFileResponse, File>({
      query: file => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload/file',
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'text/event-stream',
          },
        };
      },
    }),
  }),
});

export const {
  useUploadFileMutation,
  usePublicUploadFileMutation,
  useUploadVideoMutation,
} = UploadsExtendedEndpoints;
