import * as React from "react";

import PhotoMap from "components/PhotoMap";
import { Photo } from "types/api";
import Folders from "components/Folders";
import PhotoData from "components/PhotoData";
import { AppState } from "App";

interface Props {
  authorized: AppState["authorized"];
}

const Home: React.FC<Props> = ({ authorized }) => {
  const [photos, setPhotos] = React.useState<Photo[]>([]);

  return (
    <>
      <Folders
        {...{ authorized }}
        onPhotoFetchSuccess={(photos: Photo[]) => setPhotos(photos)}
        onPhotoFetchFailure={() => setPhotos([])}
      />
      {authorized && (
        <>
          <PhotoMap {...{ photos }} />
          <PhotoData {...{ photos }} />
        </>
      )}
    </>
  );
};

export default Home;
