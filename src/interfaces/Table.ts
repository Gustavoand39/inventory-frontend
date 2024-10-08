export interface IColumn<T> {
  key: keyof T | "actions";
  label: string;
  visible: boolean;
  renderCell?: (item: T) => React.ReactNode;
}
