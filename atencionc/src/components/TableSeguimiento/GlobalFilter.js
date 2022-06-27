import React from "react";
import "./TableSeguimiento.css";
export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <input
        placeholder="Buscar folio"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="intbl2"
      />
    </span>
  );
};
