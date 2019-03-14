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
import { Motion, spring } from "react-motion";
import { geoContains } from "d3-geo";
import { MultikinoLogo } from "./MultikinoLogo";

interface State {
  center: [number, number];
  zoom: number;
  cinemasInRange: Cinema[];
}

export type MarkerWithText = MarkerType & { text: string };

interface Props {
  map: any;
  cinemas: Cinema[];
  markers: MarkerWithText[];
  cinemasInRangeChanged: (cinemas: Cinema[]) => void;
}

export class CinemasMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // center of Poland
    const origin: [number, number] = [19.4803112, 52.0693234];
    this.state = {
      center: origin,
      zoom: 1,
      cinemasInRange: []
    };

    this.handleZoomIn = this.handleZoomIn.bind(this);
    this.handleZoomOut = this.handleZoomOut.bind(this);
    this.handleProvinceClick = this.handleProvinceClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2
    });
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2
    });
  }
  getCenter(geometry: any) {
    let center: [number, number] = [0, 0];
    let len = 0;
    if (geometry.type === "MultiPolygon") {
      for (const group of geometry.coordinates) {
        for (const polygon of group) {
          for (const point of polygon) {
            center[0] += point[0];
            center[1] += point[1];
            len++;
          }
        }
      }
    } else {
      for (const polygon of geometry.coordinates) {
        for (const point of polygon) {
          center[0] += point[0];
          center[1] += point[1];
          len++;
        }
      }
    }
    center[0] /= len;
    center[1] /= len;
    return center;
  }
  handleProvinceClick(geo: any) {
    const center = this.getCenter(geo.geometry);
    const cinemasInRange = this.props.cinemas.filter(c =>
      geoContains(geo, [c.longitude, c.latitude])
    );

    this.setState({
      zoom: 2.5,
      center: center,
      cinemasInRange: cinemasInRange
    });

    this.props.cinemasInRangeChanged(cinemasInRange);
  }
  handleReset() {
    this.setState({
      center: [0, 20],
      zoom: 1
    });
  }

  render() {
    return (
      <Motion
        style={{
          zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
          x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
          y: spring(this.state.center[1], { stiffness: 210, damping: 20 })
        }}
      >
        {({ zoom, x, y }) => (
          <ComposableMap
            className="mx-auto"
            projection="mercator"
            projectionConfig={{ scale: 850 }}
            width={250}
            height={160}
            style={{
              width: "100%",
              height: "auto"
            }}
          >
            <ZoomableGroup center={[x, y]} zoom={zoom} disablePanning>
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
        )}
      </Motion>
    );
  }
}
