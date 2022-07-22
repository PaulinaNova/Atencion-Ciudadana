import { ColumnFilter } from "./ColumnFilter";

export const COLUMNS = [
  {
    Header: "Folio",
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
  {
    Header: "Procedencia",
    accessor: "procedencia",
    Filter: ColumnFilter,
  },
  {
    Header: "Dependencia",
    accessor: "dependencia",
    Filter: ColumnFilter,
  },
  {
    Header: "Evento",
    accessor: "evento",
    Filter: ColumnFilter,
  },
  {
    Header: "Presupuesto",
    accessor: "presupuesto",
    Filter: ColumnFilter,
  },
  {
    Header: "Personas beneficiadas",
    accessor: "cant_benef",
    Filter: ColumnFilter,
  },
];
