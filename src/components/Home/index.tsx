import * as React from "react";

import PhotoMap from "components/PhotoMap";
import { Photo } from "types/api";
import Folders from "components/Folders";
import PhotoData from "components/PhotoData";
import { AuthContext } from "store";

const Home: React.FC = () => {
  const [photos, setPhotos] = React.useState<Photo[]>([]);
  const { authorized } = React.useContext(AuthContext);

  return (
    <>
      <Folders
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
