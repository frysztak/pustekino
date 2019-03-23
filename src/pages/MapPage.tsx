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
import { CustomMarker, CinemasMap } from "../components/CinemasMap";
import ListGroup from "react-bootstrap/ListGroup";
import { Section } from "../components/Section";
import { CinemaListItem } from "../components/CinemaListItem";

interface OwnProps {}

interface OwnState {
  cinemasInRange: Cinema[];
  hoversOverCinema: number;
}

interface StateProps {
  loading: boolean;
  error: string | undefined;
  cinemas: Cinema[];
  currentCinema: Cinema | undefined;
  map: any;
}

interface DispatchProps {
  load: typeof fetchRequest;
  selectCinema: typeof selectCinema;
}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MapPage extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.cinemasInRangeChanged = this.cinemasInRangeChanged.bind(this);
    this.handleCinemaHover = this.handleCinemaHover.bind(this);
    this.handleCinemaClick = this.handleCinemaClick.bind(this);

    this.state = {
      cinemasInRange: [],
      hoversOverCinema: -1
    };
  }

  componentDidMount() {
    if (this.props.cinemas.length === 0 || this.props.map === undefined) {
      this.props.load();
    }
  }

  cinemasInRangeChanged(cinemas: Cinema[]) {
    this.setState({ cinemasInRange: cinemas });
  }

  handleCinemaHover(cinemaId: number) {
    this.setState({ hoversOverCinema: cinemaId });
  }

  handleCinemaClick(cinemaId: number) {
    this.props.selectCinema(cinemaId);
  }

  render() {
    if (this.props.loading || this.props.cinemas.length === 0) {
      return <div>Loading...</div>;
    }

    const map = this.props.map;
    const markers = this.props.cinemas.map(
      (c: Cinema): CustomMarker => ({
        coordinates: [c.longitude, c.latitude],
        text: c.name,
        cinemaId: c.multikinoId
      })
    );

    return (
      <div>
        <NavBar />
        <Container>
          {this.props.currentCinema ? (
            <Row>
              <Col>
                <h4 className="mt-2">
                  {`Aktualne kino: ${this.props.currentCinema.chain} ${
                    this.props.currentCinema.name
                  }`}
                </h4>
              </Col>
            </Row>
          ) : null}

          <Row>
            <Col md={4}>
              <Section name="Kina w regionie" />
            </Col>
          </Row>

          <Row>
            <Col>
              {this.state.cinemasInRange.length === 0 ? (
                <h5>Multikino jeszcze nie zawitało do tego województwa</h5>
              ) : (
                <ListGroup className="scrollable-list">
                  {this.state.cinemasInRange.map(cinema => (
                    <CinemaListItem
                      key={cinema.id}
                      cinema={cinema}
                      onCinemaHover={this.handleCinemaHover}
                      onCinemaClick={this.handleCinemaClick}
                    />
                  ))}
                </ListGroup>
              )}
            </Col>

            <Col md={{ span: 8 }}>
              <CinemasMap
                map={map}
                cinemas={this.props.cinemas}
                markers={markers}
                hoversOverCinema={this.state.hoversOverCinema}
                cinemasInRangeChanged={this.cinemasInRangeChanged}
                cinemaSelected={this.handleCinemaClick}
              />
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
  map: cinemas.map,
  currentCinema: cinemas.currentCinema
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
