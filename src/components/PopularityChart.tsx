import React from "react";
import { PopularityPoint } from "../redux/seances/types";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLabel } from "victory";
import myTheme from "./victory-theme";

interface Props {
  data: PopularityPoint[];
}

export class PopularityChart extends React.Component<Props> {
  render() {
    const header = <h4 className="mt-2">Historia wolnych miejsc</h4>;

    if (this.props.data.length === 0) {
      return (
        <div>
          {header}
          <h5 className="text-muted">Brak danych, zapraszamy później!</h5>
        </div>
      );
    }

    return (
      <div>
        {header}
        <VictoryChart
          height={180}
          padding={{ top: 10, left: 40, bottom: 35, right: 35 }}
          domainPadding={{ y: 10 }}
          scale={{ x: "time", y: "linear" }}
          theme={myTheme}
          animate={{
            duration: 1000,
            easing: "sinInOut"
          }}
        >
          <VictoryAxis
            dependentAxis
            standalone={false}
            tickCount={4}
            label={() => ""}
            tickFormat={x => `${(x * 100).toFixed(0)}%`}
            axisLabelComponent={<VictoryLabel dy={0} />}
          />
          <VictoryAxis
            tickCount={4}
            tickFormat={x => {
              const d = new Date(x);
              const day = ("0" + d.getDate()).slice(-2);
              const month = ("0" + (d.getMonth() + 1)).slice(-2);
              return `${day}.${month}`;
            }}
          />
          <VictoryLine
            data={this.props.data}
            interpolation="monotoneX"
            x="date"
            y="seatAvailability"
          />
        </VictoryChart>
      </div>
    );
  }
}
