import { contains, filter } from "ramda";

export const getPhotoFiles = filter((file: any) =>
  contains("image", file.mimeType)
);
