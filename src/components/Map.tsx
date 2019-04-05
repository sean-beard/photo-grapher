import * as React from "react";
import styled from "styled-components";
import { Map as LMap, TileLayer, Marker, Popup } from "react-leaflet";
import { path } from "ramda";

import { Location } from "types/map";
import { Photo } from "types/api";
import ImagePopup from "components/ImagePopup";
import { Spacing } from "styles/Base";
import { hasItems } from "utils/data-operations";

const LeafletMap = styled(LMap)`
  height: 325px;
  width: 100%;
  margin-bottom: ${Spacing.LARGE};
  z-index: 0;
`;

interface Props {
  photos?: Photo[];
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

const Map: React.FunctionComponent<Props> = ({ photos }) => {
  // TODO: dynamic center location
  const center: Location = [42.151197, -73.038651];
  return hasItems(photos) ? (
    <LeafletMap {...{ center }} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PlotPhotos {...{ photos }} />
    </LeafletMap>
  ) : null;
};

export default Map;
