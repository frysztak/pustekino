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
import { MarkerWithText, CinemasMap } from "../components/CinemasMap";
import ListGroup from "react-bootstrap/ListGroup";

interface OwnProps {}

interface OwnState {
  cinemasInRange: Cinema[];
}

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

class MapPage extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.cinemasInRangeChanged = this.cinemasInRangeChanged.bind(this);

    this.state = {
      cinemasInRange: []
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

  render() {
    if (this.props.loading || this.props.cinemas.length === 0) {
      return <div>Loading...</div>;
    }

    const map = this.props.map;
    const markers = this.props.cinemas.map(
      (c: Cinema): MarkerWithText => ({
        coordinates: [c.longitude, c.latitude],
        text: c.name
      })
    );

    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Col md={4}>
              <h3 className="section-header">Kina w regionie</h3>
              <ListGroup className="scrollable-list">
                {this.state.cinemasInRange.map(cinema => (
                  <ListGroup.Item action key={cinema.multikinoId}>
                    <h5>
                      {cinema.chain} {cinema.name}
                    </h5>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col md={{ span: 8 }}>
              <CinemasMap
                map={map}
                cinemas={this.props.cinemas}
                markers={markers}
                cinemasInRangeChanged={this.cinemasInRangeChanged}
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
