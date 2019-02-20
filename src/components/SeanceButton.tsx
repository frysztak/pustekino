import React from "react";
import { Seance } from "../redux/seances/types";
import Button from "react-bootstrap/Button";

interface Props {
  seance: Seance;
}

export const SeanceButton: React.FC<Props> = ({ seance }: Props) => {
  const date = new Date(seance.date);
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);

  let buttonClass = "";
  if (seance.loading || !seance.seatAvailability) {
    buttonClass = "btn-seat-indicator-loading";
  } else if (seance.errorMessage) {
    buttonClass = ""; // TODO
  } else {
    if (seance.seatAvailability >= 0.75) {
      buttonClass = "btn-seat-indicator-low";
    } else if (seance.seatAvailability >= 0.5) {
      buttonClass = "btn-seat-indicator-medium";
    } else {
      buttonClass = "btn-seat-indicator-low";
    }
  }

  return (
    <Button
      className={`btn-xl ${buttonClass}`}
      variant="outline-primary"
    >{`${hours}:${minutes}`}</Button>
  );
};
