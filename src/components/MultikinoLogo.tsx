import React from "react";
import { ReactComponent as Logo } from "../assets/multikino.svg";

interface Props {
  animate?: boolean;
}

export const MultikinoLogo: React.FC<Props> = ({ animate }) => (
  <Logo
    className={animate ? "pulsate-fwd" : ""}
    style={{ transformOrigin: "9px 9px" }}
  />
);
