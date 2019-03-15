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
  selectedProvince: string;
}

export type MarkerWithText = MarkerType & { text: string };

interface Props {
  map: any;
  cinemas: Cinema[];
  markers: MarkerWithText[];
  cinemasInRangeChanged: (cinemas: Cinema[]) => void;
}

// center of Poland
const origin: [number, number] = [19.4803112, 52.0693234];

export class CinemasMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      cinemasInRange: [],
      selectedProvince: ""
    };

    this.handleProvinceClick = this.handleProvinceClick.bind(this);
    this.resetProvince = this.resetProvince.bind(this);

    this.props.cinemasInRangeChanged(this.props.cinemas);
  }

  handleProvinceClick(geo: any, evt: React.MouseEvent) {
    evt.stopPropagation();

    const cinemasInRange = this.props.cinemas.filter(c =>
      geoContains(geo, [c.longitude, c.latitude])
    );

    this.setState({
      cinemasInRange: cinemasInRange,
      selectedProvince: geo.properties.NAME_1
    });

    this.props.cinemasInRangeChanged(cinemasInRange);
  }

  resetProvince() {
    this.setState({
      cinemasInRange: this.props.cinemas,
      selectedProvince: ""
    });
    this.props.cinemasInRangeChanged(this.props.cinemas);
  }

  render() {
    return (
      <div onClick={this.resetProvince}>
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
            <Geographies geography={this.props.map} disableOptimization>
              {(geographies, projection) =>
                geographies.map((geography: any, i) => (
                  <Geography
                    key={`geography-${i}`}
                    cacheId={`geography-${i}`}
                    geography={geography}
                    projection={projection}
                    onClick={this.handleProvinceClick}
                    style={
                      geography.properties.NAME_1 ===
                      this.state.selectedProvince
                        ? {
                            default: { fill: "#965799" },
                            hover: { fill: "#965799" }
                          }
                        : {}
                    }
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
      </div>
    );
  }
}
