import { useCallback, useEffect, useState } from "react";

import InventoryLogTable from "../../../components/ui/Table/CustomTable";
import InventoryLogHeader from "../../../components/ui/Table/CustomTableHeader";
import InventoryLogFooter from "../../../components/ui/Table/CustomTableFooter";
import InventoryLogActions from "../../../components/InventoryLog/Table/InventoryLogActions";

import { InventoryLog } from "../../../interfaces/InventoryLog";
import { rowOptions } from "../../../constants/rowOptions";
import { IColumn } from "../../../interfaces/Table";
import { initialInventoryLogCols } from "../../../constants/initialStateInventoryLog";
import {
  getListInventory,
  getSearchInventory,
} from "../../../services/inventoryLogService";
import debounce from "../../../helpers/debounce";

const InventoryLogList = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowOptions[0].value);
  const [inventoryLog, setInventoryLog] = useState<InventoryLog[]>([]);
  const [totalInventoryLog, setTotalInventoryLog] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [columns, setColumns] = useState<IColumn<InventoryLog>[]>(
    initialInventoryLogCols
  );

  const fetchData = useCallback(async () => {
    if (searchTerm) {
      await getSearchInventory({
        word: searchTerm,
        page,
        limit: rowsPerPage,
        setInventoryLog,
        setTotalInventoryLog,
        setTotalPages,
      });
    } else {
      await getListInventory({
        page,
        limit: rowsPerPage,
        setInventoryLog,
        setTotalInventoryLog,
        setTotalPages,
      });
    }
  }, [page, rowsPerPage, searchTerm]);

  useEffect(() => {}, [inventoryLog]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleColumnVisibility = (key: string, visible: boolean) => {
    const updatedColumns = columns.map((column) =>
      column.key === key ? { ...column, visible } : column
    );
    setColumns(updatedColumns);
  };

  const searchInventoryLog = debounce({
    func: async (word: string) => {
      setSearchTerm(word);
      setPage(1);
    },
  });

  return (
    <section>
      <InventoryLogTable
        aria="Registro de inventario"
        data={inventoryLog}
        columns={columns}
        topContent={
          <InventoryLogHeader
            columns={columns}
            length={totalInventoryLog}
            toggleColumnVisibility={toggleColumnVisibility}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            searchCallback={searchInventoryLog}
            newButton={false}
          />
        }
        bottomContent={
          <InventoryLogFooter
            page={page}
            total={totalPages}
            callback={setPage}
          />
        }
        renderActions={(item: InventoryLog) => {
          return <InventoryLogActions id={item.id} />;
        }}
      />
    </section>
  );
};

export default InventoryLogList;
