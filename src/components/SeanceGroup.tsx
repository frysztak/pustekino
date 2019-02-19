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

    const hasSeances = seances.length !== 0;

    return (
      <div>
        <Row>
          <h4 className="ml-2">{this.props.name}</h4>
        </Row>
        <Row>
          {hasSeances ? (
            seances.map((seance, i) => (
              <Col className="col-auto mb-3">
                <SeanceButton seance={seance} key={i} />
              </Col>
            ))
          ) : (
            <h5 className="text-muted ml-3">Brak pokazów tego dnia</h5>
          )}

          {addShowMoreButton && hasSeances ? (
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
