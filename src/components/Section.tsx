import React from "react";
import { Cinema } from "../redux/cinemas/types";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  cinema?: Cinema;
}

export const Section: React.FC<Props> = ({ name, cinema }) => (
  <div className="mb-4 mt-2">
    <span className="h2 section-header">
      {name}
      {cinema ? (
        <Link to="/cinemas">
          <span className="h5 ml-4 text-truncate">
            {cinema.chain} {cinema.name}
          </span>
        </Link>
      ) : null}
    </span>
  </div>
);
