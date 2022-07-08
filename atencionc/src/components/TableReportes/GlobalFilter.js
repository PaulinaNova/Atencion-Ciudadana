import React from "react";
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <input
        placeholder="Buscar"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="inpReportesF"
      />
    </span>
  );
};
