import * as React from "react";

import PhotoMap from "components/PhotoMap";
import Folders from "components/Folders";
import PhotoData from "components/PhotoData";
import { AuthContext, PhotoProvider } from "store";

const Home: React.FC = () => {
  const { authorized } = React.useContext(AuthContext);

  return (
    <PhotoProvider>
      <Folders />
      {authorized && (
        <>
          <PhotoMap />
          <PhotoData />
        </>
      )}
    </PhotoProvider>
  );
};

export default Home;
