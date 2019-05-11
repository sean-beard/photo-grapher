import * as React from "react";
import styled from "styled-components";
import { Map as LMap, TileLayer, Marker } from "react-leaflet";
import { path } from "ramda";

import { Photo } from "types/api";
import ImagePopup from "components/ImagePopup";
import { Spacing } from "styles/Base";
import { hasItems } from "utils/data-operations";
import { getLatLongCenter } from "utils/map";
import { getLocations } from "utils/photos";

const LeafletMap = styled(LMap)`
  height: 325px;
  width: 100%;
  margin-bottom: ${Spacing.LARGE};
  z-index: 0;
`;

interface Props {
  photos: Photo[];
}

const PlotPhotos: React.FunctionComponent<Props> = ({ photos }) => (
  <>
    {(photos || []).map(({ id, imageMediaMetadata: { location } }) => {
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

const PhotoMap: React.FunctionComponent<Props> = ({ photos }) => {
  // TODO: dynamic zoom value
  const center = getLatLongCenter(getLocations(photos));
  return hasItems(photos) ? (
    <LeafletMap {...{ center }} zoom={8}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <PlotPhotos {...{ photos }} />
    </LeafletMap>
  ) : null;
};

export default PhotoMap;
