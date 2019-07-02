import { isEmpty } from "ramda";
import * as React from "react";
import styled from "styled-components";
import { VictoryBar } from "victory";
import { Redirect } from "react-router-dom";

import { Colors, Spacing, Breakpoints } from "styles/Base";
import { avgCountPerWeekDay, countPerHour } from "utils/photos";
import { getAbbreviatedDay } from "utils/time";
import { ScrollableChart } from "./Scrollable";
import { AuthContext, PhotoContext } from "store";

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

const FullRowChart = styled.div`
  width: 50%;

  @media (${Breakpoints.TABLET}) {
    width: 100%;
  }
`;

const PhotoData: React.FC = () => {
  const { authorized } = React.useContext(AuthContext);
  const { photos } = React.useContext(PhotoContext);

  if (!authorized || isEmpty(photos)) {
    return <Redirect to="/" />;
  }

  const avgNumPhotosPerDay = avgCountPerWeekDay(photos);
  const avgPerDayGraphData = avgNumPhotosPerDay.map(([day, count]) => ({
    x: getAbbreviatedDay(day),
    y: Math.round(count * 100) / 100
  }));
  const countPerHourGraphData = countPerHour(photos)
    .map(({ hour, count }) => ({
      x: hour,
      y: count
    }))
    .reverse();

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
        <ScrollableChart domainPadding={10}>
          <VictoryBar
            style={{ data: { fill: Colors.ACTION_BLUE } }}
            data={avgPerDayGraphData}
          />
        </ScrollableChart>
      </AvarageCountBarChart>
      <h3>Count Per Hour</h3>
      <FullRowChart>
        <ScrollableChart
          domainPadding={5}
          padding={{ top: 0, bottom: 30, left: 50, right: 20 }}
        >
          <VictoryBar
            style={{ data: { fill: Colors.ACTION_BLUE } }}
            data={countPerHourGraphData}
            horizontal={true}
          />
        </ScrollableChart>
      </FullRowChart>
    </>
  );
};

export default PhotoData;
