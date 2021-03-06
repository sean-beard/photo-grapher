import * as React from "react";
import { VictoryChart, VictoryTheme, VictoryChartProps } from "victory";

const Scrollable: React.FC = ({ children }) => (
  <div style={{ width: "100%" }}>
    <svg
      viewBox="0 0 350 350"
      width="auto"
      height="auto"
      role="image"
      aria-label="victory-chart"
    >
      {children}
    </svg>
  </div>
);

export const ScrollableChart: React.FC<VictoryChartProps> = ({
  children,
  ...props
}) => (
  <Scrollable>
    <VictoryChart
      theme={VictoryTheme.material}
      standalone={false}
      domainPadding={5}
      padding={{ top: 0, bottom: 50, left: 50, right: 50 }}
      {...props}
    >
      {children}
    </VictoryChart>
  </Scrollable>
);
