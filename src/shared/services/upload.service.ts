import httpClient from '@shared/api/httpClient';
import type { ApiEnvelope } from '@typings/api';

export interface UploadFile {
  uri: string;
  name: string;
  type: string;
}

interface UploadResult {
  url: string;
}

export async function uploadFile(file: UploadFile): Promise<string> {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    name: file.name,
    type: file.type,
  } as unknown as Blob);

  const { data } = await httpClient.post<ApiEnvelope<UploadResult>>(
    '/upload',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data.data.url;
}
