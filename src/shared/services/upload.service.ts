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

  // Don't set Content-Type manually — axios auto-generates the multipart
  // boundary from the FormData instance. A hardcoded 'multipart/form-data'
  // with no boundary produces a body the backend can't parse.
  const { data } = await httpClient.post<ApiEnvelope<UploadResult>>(
    '/upload',
    formData,
  );
  return data.data.url;
}
