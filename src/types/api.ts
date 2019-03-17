export interface Folder {
  id: string;
  name: string;
}

export interface Photo {
  id: string;
  imageMediaMetadata: ImageMediaMetadata;
  name: string;
}

export interface ImageMediaMetadata {
  location?: ImageLocation;
}

export interface ImageLocation {
  latitude?: number;
  longitude?: number;
  altitude?: number;
}
