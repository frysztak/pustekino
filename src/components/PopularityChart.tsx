import React from "react";
import { PopularityPoint } from "../redux/seances/types";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
  VictoryGroup,
  VictoryTooltip
} from "victory";
import myTheme from "./victory-theme";

interface Props {
  data: PopularityPoint[];
}

export class PopularityChart extends React.Component<Props> {
  private getDateTick(date: any) {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    return `${day}.${month}`;
  }

  render() {
    const header = <h4 className="mt-2">Historia zajętych miejsc</h4>;

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
          animate={{ duration: 0 }}
        >
          <VictoryAxis
            dependentAxis
            standalone={false}
            tickCount={4}
            label={() => ""}
            tickFormat={x => `${(x * 100).toFixed(0)}%`}
            axisLabelComponent={<VictoryLabel dy={0} />}
          />
          <VictoryAxis tickCount={4} tickFormat={x => this.getDateTick(x)} />
          <VictoryGroup
            labels={d =>
              `${this.getDateTick(d.date)}: ${(
                100 * d.seatAvailability
              ).toFixed(0)}%`
            }
            labelComponent={<VictoryTooltip theme={myTheme} />}
          >
            <VictoryLine
              data={this.props.data}
              interpolation="monotoneX"
              x="date"
              y="seatAvailability"
              animate={{ duration: 1000 }}
            />
            <VictoryScatter
              data={this.props.data}
              x="date"
              y="seatAvailability"
              size={(datum, active) => (active ? 3 : 1)}
              animate={{ duration: 500 }}
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onMouseEnter: () => ({
                      target: "data",
                      mutation: dataProps => ({
                        ...dataProps,
                        active: true
                      })
                    }),
                    onMouseLeave: () => ({
                      target: "data",
                      mutation: dataProps => ({
                        ...dataProps,
                        active: false
                      })
                    }),
                    onMouseMove: () => ({
                      target: "data",
                      mutation: dataProps => ({
                        ...dataProps,
                        active: true
                      })
                    })
                  }
                }
              ]}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}
