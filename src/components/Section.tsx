import React from "react";

interface Props {
  name: string;
}

export const Section: React.FC<Props> = ({ name }) => (
  <div className="mb-4 mt-2">
    <h2 className="mb-0 section-header">{name}</h2>
    <div className="separator" />
  </div>
);
