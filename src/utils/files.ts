import { contains, filter } from "ramda";

import { Photo } from "types/api";

export const getPhotoFiles = filter((file: any) =>
  contains("image", file.mimeType)
);

export const getPhotosWithLocation = (photos: Photo[]) =>
  filter(
    ({ imageMediaMetadata }: Photo) => !!imageMediaMetadata.location,
    photos
  );
