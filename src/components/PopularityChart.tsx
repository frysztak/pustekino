import React from "react";
import { PopularityPoint } from "../redux/seances/types";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryScatter,
  VictoryGroup,
  VictoryTooltip,
  VictoryArea
} from "victory";
import myTheme from "./victory-theme";

interface Props {
  data: PopularityPoint[];
  weekends: Date[][];
}

export class PopularityChart extends React.Component<Props> {
  private getDateTick(date: any) {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    return `${day}.${month}`;
  }

  private mapWeekends(weekends: Date[]): Data[] {
    const first = new Date(weekends[0]);
    const last = new Date(weekends[weekends.length - 1]);

    const r = [
      { x: first, y: 0 },
      { x: first, y: 1 },
      { x: last, y: 1 },
      { x: last, y: 0 }
    ];
    console.log(r);

    return r;
  }

  render() {
    if (this.props.data.length === 0) {
      return (
        <div>
          <h4 className="text-muted">Brak danych, zapraszamy później!</h4>
        </div>
      );
    }

    return (
      <div>
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
              size={(datum, active) => (active ? 3 : 2)}
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

            {this.props.weekends.map((group, i) => (
              <VictoryArea
                key={i}
                data={this.mapWeekends(group)}
                x="x"
                y="y"
                scale={{ x: "time", y: "linear" }}
                style={{ data: { fill: "tomato", fillOpacity: 0.5 } }}
              />
            ))}
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}
