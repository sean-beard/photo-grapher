import * as React from "react";
import styled from "styled-components";
import {
  VictoryChart,
  VictoryTheme,
  VictoryBar,
  VictoryPie,
  VictoryLabel
} from "victory";
import { filter } from "ramda";

import { Photo } from "types/api";
import { Colors, Spacing, Breakpoints } from "styles/Base";
import { avgCountPerWeekDay } from "utils/photos";
import { getAbbreviatedDay } from "utils/time";
import { hasItems } from "utils/data-operations";

const Listing = styled.div`
  display: flex;

  > * {
    margin: ${Spacing.NORMAL} 0 ${Spacing.NORMAL} ${Spacing.MEDIUM};
  }

  h4 + h4 {
    margin-left: ${Spacing.MICRO};
  }

  @media (${Breakpoints.TABLET}) {
    > * {
      margin: ${Spacing.MICRO} 0 ${Spacing.MICRO} ${Spacing.MEDIUM};
    }
  }
`;

const AvarageCountBarChart = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  > * {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  @media (${Breakpoints.MOBILE}) {
    flex-direction: column;
  }
`;

const ListingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AverageCountPieChart = styled.div`
  width: 50%;

  @media (${Breakpoints.MOBILE}) {
    width: 100%;
  }
`;

interface Props {
  photos: Photo[];
}

const PhotoData: React.FC<Props> = ({ photos }) => {
  if (!hasItems(photos)) {
    return null;
  }

  const avgNumPhotosPerDay = avgCountPerWeekDay(photos);
  const avgPerDayGraphData = avgNumPhotosPerDay.map(([day, count]) => ({
    x: getAbbreviatedDay(day),
    y: Math.round(count * 100) / 100
  }));

  return (
    <>
      <h2>{photos.length} total photos</h2>
      <h3>Average Count Per Week Day</h3>
      <AvarageCountBarChart>
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
            data={avgPerDayGraphData}
          />
        </VictoryChart>
      </AvarageCountBarChart>
      <AverageCountPieChart>
        <VictoryPie
          data={filter(dataPoint => dataPoint.y !== 0, avgPerDayGraphData)}
          labelComponent={
            <VictoryLabel
              style={{ fill: Colors.ACTION_BLUE, stroke: Colors.ACTION_BLUE }}
            />
          }
        />
      </AverageCountPieChart>
    </>
  );
};

export default PhotoData;
