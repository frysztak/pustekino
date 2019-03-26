import React from "react";
import { Seance } from "../redux/seances/types";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

interface Props {
  seance: Seance;
  movieId: number;
  cinemaId: number;
}

export class SeanceButton extends React.Component<Props> {
  private getTicketUrl() {
    return `https://multikino.pl/kupbilet/${this.props.movieId}/${
      this.props.cinemaId
    }/1/${this.props.seance.multikinoId}/wybierz-miejsce`;
  }

  render() {
    const seance = this.props.seance;
    const date = new Date(seance.date);
    const hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2);

    let buttonClass = "";
    if (seance.loading) {
      buttonClass = "btn-seat-indicator-loading";
    } else if (seance.errorMessage) {
      buttonClass = "";
    } else {
      if (seance.seatAvailability >= 0.75) {
        buttonClass = "btn-seat-indicator-low";
      } else if (seance.seatAvailability >= 0.5) {
        buttonClass = "btn-seat-indicator-medium";
      } else {
        buttonClass = "btn-seat-indicator-low";
      }
    }

    const button = (
      <Button
        className={`btn-xl ${buttonClass}`}
        variant="outline-primary"
        href={this.getTicketUrl()}
      >{`${hours}:${minutes}`}</Button>
    );

    if (!seance.loading && seance.takenSeatCount && seance.allSeatCount) {
      const percentage = (
        (100 * seance.takenSeatCount) /
        seance.allSeatCount
      ).toFixed(2);

      return (
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-${seance.id}`}>
              {`${seance.takenSeatCount}/${
                seance.allSeatCount
              } (${percentage}%)`}
            </Tooltip>
          }
          children={button}
        />
      );
    }

    return button;
  }
}
