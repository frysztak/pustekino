import React from "react";
import { PopularityPoint, NumericDate } from "../redux/seances/types";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ReferenceArea,
  ResponsiveContainer,
  TooltipProps
} from "recharts";

interface Props {
  data: PopularityPoint[];
  weekends: NumericDate[][];
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
  private CustomTooltip({ payload, label, active }: TooltipProps) {
    if (active && payload) {
      return (
        <div className="recharts-tooltip">
          <div>
            <span className="text-muted">Dzień: </span>
            <span>{xTooltipFormatter(label)}</span>
          </div>

          <div>
            <span className="text-muted">Zajętych miejsc: </span>
            <span>{yTickFormatter(payload[0].value)}</span>
          </div>
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
                />
              );
            })}

            <Line type="monotone" dataKey="seatAvailability" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
