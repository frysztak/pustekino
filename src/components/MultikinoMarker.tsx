import React from "react";
import { ReactComponent as Logo } from "../assets/multikino.svg";

interface Props {
  animate?: boolean;
  cinemaId: number;
  onCinemaClicked: (cinemaId: number) => void;
}

export class MultikinoMarker extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onCinemaClicked(this.props.cinemaId);
  }

  render() {
    return (
      <Logo
        className={this.props.animate ? "pulsate-fwd" : ""}
        style={{ transformOrigin: "9px 9px" }}
        onClick={this.handleClick}
      />
    );
  }
}
