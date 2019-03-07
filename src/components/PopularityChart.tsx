import React from "react";
import { PopularityPoint, NumericDate } from "../redux/seances/types";
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
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ReferenceArea,
  ScatterChart,
  ResponsiveContainer,
  TooltipProps
} from "recharts";

interface Props {
  data: PopularityPoint[];
  weekends: NumericDate[][];
}

interface ChartData {
  x: Date;
  y: number;
}

function xTickFormatter(date: any) {
  const d = new Date(date);
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  return `${day}.${month}`;
}

const days = [
  "Niedziela",
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota"
];

function xTooltipFormatter(date: any) {
  const d = new Date(date);
  const day = ("0" + d.getDate()).slice(-2);
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  return `${days[d.getDay()]} ${day}.${month}`;
}

function yTickFormatter(value: any) {
  return `${(value * 100).toFixed(0)}%`;
}

export class PopularityChart extends React.Component<Props> {
  private mapWeekends(weekends: NumericDate[]): ChartData[] {
    const first = new Date(weekends[0]);
    const last = new Date(weekends[weekends.length - 1]);

    return [
      { x: first, y: 0 },
      { x: first, y: 1 },
      { x: last, y: 1 },
      { x: last, y: 0 }
    ];
  }

  private CustomTooltip({ payload, label, active }: TooltipProps) {
    if (active && payload) {
      return (
        <div className="recharts-tooltip">
          <p>
            <span className="text-muted">Dzień: </span>
            <span>{xTooltipFormatter(label)}</span>
          </p>

          <p>
            <span className="text-muted">Zajętych miejsc: </span>
            <span>{yTickFormatter(payload[0].value)}</span>
          </p>
        </div>
      );
    }

    return null;
  }

  render() {
    if (this.props.data.length === 0) {
      return (
        <div>
          <h4 className="text-muted">Brak danych, zapraszamy później!</h4>
        </div>
      );
    }

    const domain: [number, number] = [
      this.props.data[0].date,
      this.props.data[this.props.data.length - 1].date
    ];

    return (
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
            data={this.props.data}
          >
            <XAxis
              dataKey="date"
              type="number"
              scale="linear"
              domain={domain}
              padding={{ left: 10, right: 10 }}
              tickFormatter={xTickFormatter}
              tickMargin={20}
              interval={4}
            />
            <YAxis
              type="number"
              tickFormatter={yTickFormatter}
              tickMargin={20}
            />
            <Tooltip
              content={<this.CustomTooltip />}
              isAnimationActive={false}
            />

            <Line type="monotone" dataKey="seatAvailability" />

            {this.props.weekends.map((group, i) => {
              const first = group[0];
              const last = group[group.length - 1];
              return (
                <ReferenceArea
                  key={i}
                  x1={first}
                  x2={last}
                  y1={0}
                  y2={1}
                  ifOverflow="extendDomain"
                  strokeOpacity={0.3}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
        {/*
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
            */}
      </div>
    );
  }
}
