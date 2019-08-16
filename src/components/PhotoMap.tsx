import * as React from "react";
import styled from "styled-components";
import { Map as LMap, TileLayer, Marker } from "react-leaflet";
import { path, isEmpty } from "ramda";
import { FitBoundsOptions } from "leaflet";
import { Redirect } from "react-router-dom";

import { Photo } from "types/api";
import ImagePopup from "components/ImagePopup";
import { getBounds } from "utils/map";
import { getLocations } from "utils/photos";
import { AuthContext, PhotoContext } from "store";

const LeafletMap = styled(LMap)`
  flex: 1;
  width: 100%;
  z-index: 0;
`;

interface Props {
  photos: Photo[];
}

const PlotPhotos: React.FC<Props> = ({ photos }) => (
  <>
    {photos.map(({ id, imageMediaMetadata: { location } }) => {
      const lat: number | undefined = path(["latitude"], location || {});
      const long: number | undefined = path(["longitude"], location || {});

      return (
        lat &&
        long && (
          <Marker key={id} position={[lat, long]}>
            <ImagePopup photoId={id} />
          </Marker>
        )
      );
    })}
  </>
);

const PhotoMap: React.FC = () => {
  const { authorized } = React.useContext(AuthContext);
  const { photos } = React.useContext(PhotoContext);

  if (!authorized || isEmpty(photos)) {
    return <Redirect to="/" />;
  }

  const bounds = getBounds(getLocations(photos));
  const boundsOptions: FitBoundsOptions = { padding: [45, 45] };

  return (
    <LeafletMap {...{ bounds, boundsOptions }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <PlotPhotos {...{ photos }} />
    </LeafletMap>
  );
};

export default PhotoMap;
