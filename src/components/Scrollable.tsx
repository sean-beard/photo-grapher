import * as React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryChartProps,
  VictoryPie,
  VictoryPieProps
} from "victory";

const Scrollable: React.FC = ({ children }) => (
  <svg
    viewBox="0 0 350 350"
    width="350"
    height="350"
    role="image"
    aria-label="victory-chart"
  >
    {children}
  </svg>
);

export const ScrollableChart: React.FC<VictoryChartProps> = ({
  children,
  ...props
}) => (
  <Scrollable>
    <VictoryChart theme={VictoryTheme.material} standalone={false} {...props}>
      {children}
    </VictoryChart>
  </Scrollable>
);

export const ScrollablePie: React.FC<VictoryPieProps> = ({
  children,
  ...props
}) => (
  <Scrollable>
    <VictoryPie standalone={false} {...props} />
  </Scrollable>
);
