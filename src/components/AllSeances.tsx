import React from "react";
import { Seances } from "../redux/seances/types";
import { SeanceGroup } from "./SeanceGroup";

interface Props {
  seances: Seances;
}

export class AllSeances extends React.Component<Props> {
  render() {
    const seances = this.props.seances;
    const hasAnySeances =
      seances.today.length !== 0 ||
      seances.tomorrow.length !== 0 ||
      seances.later.length !== 0;

    if (!hasAnySeances) {
      return (
        <h4 className="text-muted">Brak seansów w najbliższych dniach.</h4>
      );
    }

    const result = [];
    if (seances.today.length !== 0) {
      result.push(<SeanceGroup seances={seances.today} type="today" />);
    }

    if (seances.tomorrow.length !== 0) {
      if (result.length !== 0) result.push(<hr />);
      result.push(<SeanceGroup seances={seances.tomorrow} type="tomorrow" />);
    }

    if (seances.later.length !== 0) {
      if (result.length !== 0) result.push(<hr />);
      result.push(<SeanceGroup seances={seances.later} type="later" />);
    }

    return result;
  }
}
