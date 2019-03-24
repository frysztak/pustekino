import React from "react";

interface Props {
  name: string;
}

export const Section: React.FC<Props> = ({ name }) => (
  <div className="mb-4 mt-2">
    <span className="h2 section-header">{name}</span>
  </div>
);
