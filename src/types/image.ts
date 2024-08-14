export interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export interface PaginatedImagesResponse {
  images: Image[];
  page?: number;
}
