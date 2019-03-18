import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Cinema } from "../redux/cinemas/types";

interface Props {
  cinema: Cinema;
  onCinemaHover: (cinemaId: number) => void;
  onCinemaClick: (cinemaId: number) => void;
}

export class CinemaListItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.cinemaHoverEnter = this.cinemaHoverEnter.bind(this);
    this.cinemaHoverEnd = this.cinemaHoverEnd.bind(this);
    this.cinemaClicked = this.cinemaClicked.bind(this);
  }

  cinemaHoverEnter(evt: React.MouseEvent) {
    this.props.onCinemaHover(this.props.cinema.multikinoId);
  }

  cinemaHoverEnd(evt: React.MouseEvent) {
    this.props.onCinemaHover(-1);
  }

  cinemaClicked(evt: React.MouseEvent) {
    this.props.onCinemaClick(this.props.cinema.multikinoId);
  }

  render() {
    const cinema = this.props.cinema;

    return (
      <ListGroup.Item
        action
        key={cinema.multikinoId}
        onMouseEnter={this.cinemaHoverEnter}
        onMouseLeave={this.cinemaHoverEnd}
        onClick={this.cinemaClicked}
      >
        <h5>
          {cinema.chain} {cinema.name}
        </h5>
      </ListGroup.Item>
    );
  }
}
