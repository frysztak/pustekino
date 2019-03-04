import React from "react";

interface Props {
  name: string;
}

export const Section: React.FC<Props> = ({ name }) => (
  <h2 className="section-header mb-4 mt-2">{name}</h2>
);
