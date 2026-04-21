// types/datatable.ts
export interface ColumnDef {
  name: string;
  title: string;
  searchable?: boolean;
  orderable?: boolean;
}

export interface ServerResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: any[];
}