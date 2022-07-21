import { ColumnFilter } from "./GlobalFilterHistorial";

export const COLUMNS = [
  {
    Header: "Folio Interno",
    accessor: "folio_interno",
    Filter: ColumnFilter,
  },
  {
    Header: "Captura",
    accessor: "fecha",
    Filter: ColumnFilter,
  },
  {
    Header: "Descripcion",
    accessor: "descripcion",
    Filter: ColumnFilter,
  },
  {
    Header: "Tipo",
    accessor: "tipo",
    Filter: ColumnFilter,
  },
  {
    Header: "Estado",
    accessor: "estado",
    Filter: ColumnFilter,
  },
  {
    Header: "Prioridad",
    accessor: "prioridad",
    Filter: ColumnFilter,
  },
];
