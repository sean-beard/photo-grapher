import { filter } from "ramda";

import { Photo } from "types/api";

export const getPhotosWithLocation = (photos: Photo[]) =>
  filter(
    ({ imageMediaMetadata }: Photo) => !!imageMediaMetadata.location,
    photos
  );
