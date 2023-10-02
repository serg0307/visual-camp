export interface ProductInterface {
  id: string;
  title: string;
  contentUrl: string;
  isVideo?: boolean;
  downloadLink?: string;
  description: string;
  images: string[];
}
