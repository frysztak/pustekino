import React from "react";
import { Seance } from "../redux/seances/types";
import { SeanceButton } from "./SeanceButton";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  seances: Seance[];
  name: string;
}

interface State {
  showAll: boolean;
}

const N = 5;

export class SeanceGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { showAll: false };
  }

  render() {
    const addShowMoreButton = this.state.showAll
      ? false
      : this.props.seances.length > N;

    const seances = this.state.showAll
      ? this.props.seances
      : this.props.seances.slice(0, N);

    return (
      <div>
        <Row>
          <h4>{this.props.name}</h4>
        </Row>
        <Row>
          {seances.map((seance, i) => (
            <Col className="col-auto mb-3">
              <SeanceButton seance={seance} key={i} />
            </Col>
          ))}
          {addShowMoreButton ? (
            <Col className="col-auto mb-3">
              <Button
                size="lg"
                onClick={() => this.setState({ showAll: true })}
              >
                więcej...
              </Button>
            </Col>
          ) : null}
        </Row>
      </div>
    );
  }
}
