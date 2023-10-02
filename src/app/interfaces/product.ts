export interface IProduct {
  id: string;
  title: string;
  contentUrl: string;
  isVideo?: boolean;
  downloadLink?: string;
  fileName?: string;
  mimeType?: string;
  description: string;
}
