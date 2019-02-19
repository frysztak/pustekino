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

  return (
    <Button size="lg" variant="outline-primary">{`${hours}:${minutes}`}</Button>
  );
};
