export interface IColumn {
  key: string;
  label: string;
  visible: boolean;
}

export interface ITableHeader {
  columns: { key: string; label: string; visible: boolean }[];
  length: number;
  toggleColumnVisibility: (key: string, visible: boolean) => void;
  openCreateModal?: () => void;
}
