import React from "react";
import Redux from "redux";
import { Movie } from "../redux/movies/types";
import { ConnectedReduxProps, AppState } from "../redux/store";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { NavBar } from "../components/NavBar";

interface StateProps {
  movie: Movie | undefined;
}

interface DispatchProps {}

type Props = StateProps & DispatchProps & ConnectedReduxProps;

class MoviePage extends React.Component<Props> {
  render() {
    if (!this.props.movie) {
      return <div>Movie is not selected</div>;
    }

    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Col xs={6}>
              <Image src={this.props.movie.hero_url} fluid />
            </Col>
            <Col xs={6}>
              <h1>{this.props.movie.title_pl}</h1>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  movie: state.movies.currentMovie
});

const mapDispatchToProps = (dispatch: Redux.Dispatch): DispatchProps => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
