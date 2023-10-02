export interface IGalleryItem {
  id: string;
  title: string;
  contentUrl: string;
  isVideo?: boolean;
  description: string;
  images: string[];
}
