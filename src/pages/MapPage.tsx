import React from "react";
import Redux from "redux";
import { Cinema } from "../redux/cinemas/types";
import { fetchRequest, selectCinema } from "../redux/cinemas/actions";
import { ConnectedReduxProps, AppState } from "../redux/store";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";
import { NavBar } from "../components/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from "react-simple-maps";

interface OwnProps {}

interface StateProps {
  loading: boolean;
  error: string | undefined;
  cinemas: Cinema[];
  map: any;
}

interface DispatchProps {
  load: typeof fetchRequest;
  selectCinema: typeof selectCinema;
}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MapPage extends React.Component<Props> {
  componentDidMount() {
    if (this.props.cinemas.length === 0 || this.props.map === undefined) {
      this.props.load();
    }
  }

  render() {
    if (this.props.loading || this.props.cinemas.length === 0) {
      return <div>Loading...</div>;
    }

    const map = this.props.map;
    const origin: [number, number] = [19.4803112, 52.0693234];

    const cinemas = this.props.cinemas.map(c => c.name).join(" | ");

    return (
      <div>
        <NavBar />
        <Container fluid>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h5>{cinemas}</h5>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <ComposableMap
                className="mx-auto"
                projection="mercator"
                projectionConfig={{ scale: 850 }}
                width={250}
                height={150}
                style={{
                  width: "100%",
                  height: "auto"
                }}
              >
                <ZoomableGroup center={origin} disablePanning>
                  <Geographies geography={map}>
                    {(geographies, projection) =>
                      geographies.map((geography, i) => (
                        <Geography
                          key={`geography-${i}`}
                          geography={geography}
                          projection={projection}
                        />
                      ))
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ cinemas }: AppState): StateProps => ({
  loading: cinemas.loading,
  error: cinemas.errorMessage,
  cinemas: cinemas.cinemas,
  map: cinemas.map
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({
  load: () => dispatch(fetchRequest()),
  selectCinema: (cinemaId: number) => dispatch(selectCinema(cinemaId))
});

export default withCookies(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MapPage)
);
