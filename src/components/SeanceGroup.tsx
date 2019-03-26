import React from "react";
import { Seance } from "../redux/seances/types";
import { SeanceButton } from "./SeanceButton";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  seances: Seance[] | Seance[][];
  type: "today" | "tomorrow" | "later";
  cinemaId: number;
  movieId: number;
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

  private mapDay(day: number) {
    switch (day) {
      case 0:
        return "Niedziela";
      case 1:
        return "Poniedziałek";
      case 2:
        return "Wtorek";
      case 3:
        return "Środa";
      case 4:
        return "Czwartek";
      case 5:
        return "Piątek";
      case 6:
        return "Sobota";
      default:
        return "???";
    }
  }

  private mapType() {
    switch (this.props.type) {
      case "today":
        return "Dziś";
      case "tomorrow":
        return "Jutro";
      case "later":
        return "Później";
    }
  }

  private renderSingleGroup(allSeances: Seance[], skipDayName = false) {
    const addShowMoreButton: boolean = this.state.showAll
      ? false
      : allSeances.length > N;

    const seances = this.state.showAll ? allSeances : allSeances.slice(0, N);
    const hasSeances = seances.length !== 0;

    let date = "";
    if (hasSeances) {
      const d = new Date(seances[0].date);
      const month = ("0" + d.getMonth()).slice(-2);
      date = `${this.mapDay(d.getDay())} ${d.getDate()}.${month}`;
    }

    const dayNameClass = "h4 ml-3";
    const dateClass = skipDayName ? dayNameClass : "h5 text-muted ml-3";

    return (
      <>
        <Row>
          <span>
            {skipDayName ? null : (
              <span className={dayNameClass}>{this.mapType()}</span>
            )}
            {hasSeances ? <span className={dateClass}>{date}</span> : null}
          </span>
        </Row>
        <Row>
          {hasSeances ? (
            seances.map((seance, i) => (
              <Col className="col-auto mb-3 mt-2" key={i}>
                <SeanceButton
                  seance={seance}
                  movieId={this.props.movieId}
                  cinemaId={this.props.cinemaId}
                />
              </Col>
            ))
          ) : (
            <h5 className="text-muted ml-3">Brak seansów</h5>
          )}

          {addShowMoreButton && hasSeances ? (
            <Col className="col-auto mb-3 mt-2">
              <Button
                className="btn-xl"
                onClick={() => this.setState({ showAll: true })}
              >
                więcej...
              </Button>
            </Col>
          ) : null}
        </Row>
      </>
    );
  }

  render() {
    if (this.props.type === "later") {
      if (this.props.seances.length === 0) return null;
      const seances = this.state.showAll
        ? this.props.seances
        : [this.props.seances[0]];
      return (seances as Seance[][]).map(group => (
        <>
          {this.renderSingleGroup(group, true)}
          <hr />
        </>
      ));
    } else {
      return this.renderSingleGroup(this.props.seances as Seance[]);
    }
  }
}
