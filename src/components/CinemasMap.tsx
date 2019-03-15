import React from "react";
import { Cinema } from "../redux/cinemas/types";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
  MarkerType
} from "react-simple-maps";
import { geoContains } from "d3-geo";
import { MultikinoLogo } from "./MultikinoLogo";

interface State {
  cinemasInRange: Cinema[];
}

export type MarkerWithText = MarkerType & { text: string };

interface Props {
  map: any;
  cinemas: Cinema[];
  markers: MarkerWithText[];
  cinemasInRangeChanged: (cinemas: Cinema[]) => void;
}

const origin: [number, number] = [19.4803112, 52.0693234];

export class CinemasMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // center of Poland
    this.state = {
      cinemasInRange: []
    };

    this.handleProvinceClick = this.handleProvinceClick.bind(this);

    this.props.cinemasInRangeChanged(this.props.cinemas);
  }

  handleProvinceClick(geo: any) {
    const cinemasInRange = this.props.cinemas.filter(c =>
      geoContains(geo, [c.longitude, c.latitude])
    );

    this.setState({
      cinemasInRange: cinemasInRange
    });

    this.props.cinemasInRangeChanged(cinemasInRange);
  }

  render() {
    return (
      <ComposableMap
        projection="mercator"
        projectionConfig={{ scale: 2100, yOffset: 400, xOffset: -100 }}
        width={500}
        height={450}
        style={{
          width: "100%",
          height: "auto"
        }}
      >
        <ZoomableGroup center={origin} disablePanning>
          <Geographies geography={this.props.map}>
            {(geographies, projection) =>
              geographies.map((geography, i) => (
                <Geography
                  key={`geography-${i}`}
                  geography={geography}
                  projection={projection}
                  onClick={this.handleProvinceClick}
                />
              ))
            }
          </Geographies>
          <Markers>
            {this.props.markers.map((marker, i) => (
              <Marker key={i} marker={marker}>
                <MultikinoLogo />
              </Marker>
            ))}
          </Markers>
        </ZoomableGroup>
      </ComposableMap>
    );
  }
}
