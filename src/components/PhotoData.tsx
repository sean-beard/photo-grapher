import * as React from "react";
import styled from "styled-components";
import { VictoryChart, VictoryTheme, VictoryBar } from "victory";

import { Photo } from "types/api";
import { Colors, Spacing } from "styles/Base";
import { avgCountPerWeekDay } from "utils/photos";
import { getAbbreviatedDay } from "utils/time";
import { hasItems } from "utils/data-operations";

const Listing = styled.div`
  display: flex;

  > * {
    margin: ${Spacing.MICRO} 0 ${Spacing.MICRO} ${Spacing.MEDIUM};
  }

  h4 + h4 {
    margin-left: ${Spacing.MICRO};
  }
`;

const AverageCountWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > * {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

interface Props {
  photos: Photo[];
}

const PhotoData: React.FC<Props> = ({ photos }) => {
  if (!hasItems(photos)) {
    return null;
  }

  const avgNumPhotosPerDay = avgCountPerWeekDay(photos);

  return (
    <>
      <h2>Total photos: {photos.length}</h2>
      <h3>Average Photo Count Per Week Day</h3>
      <AverageCountWrapper>
        <div>
          <ListingWrapper>
            {avgNumPhotosPerDay.map(([day, count], index) => (
              <Listing key={index}>
                <h4>{`${day}:`}</h4>
                <h4>{Math.round(count * 100) / 100}</h4>
              </Listing>
            ))}
          </ListingWrapper>
        </div>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar
            style={{ data: { fill: Colors.ACTION_BLUE } }}
            data={avgNumPhotosPerDay.map(([day, count]) => ({
              x: getAbbreviatedDay(day),
              y: Math.round(count * 100) / 100
            }))}
          />
        </VictoryChart>
      </AverageCountWrapper>
    </>
  );
};

export default PhotoData;
