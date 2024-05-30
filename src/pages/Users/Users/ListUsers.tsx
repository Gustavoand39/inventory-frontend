import { useCallback, useEffect, useState } from "react";

import CustomModal from "../../../components/ui/Modal/CustomModal";
import UserTable from "../../../components/ui/Table/CustomTable";
import UserForm from "../../../components/users/modal/UserForm";
import NewUserForm from "../../../components/users/modal/NewUserForm";
import UserHeader from "../../../components/ui/Table/CustomTableHeader";
import UserFootter from "../../../components/ui/Table/CustomTableFooter";
import UserActions from "../../../components/users/table/RenderActions";

import {
  initialUsersColumns,
  initialUserState,
} from "../../../constants/initialStateUsers";
import {
  createUser,
  deleteUser,
  getListUsers,
  getUser,
  searchUsers,
  updateUser,
} from "../../../services/userService";
import { IColumn } from "../../../interfaces/Table";
import { INewUser, IUser } from "../../../interfaces/user";
import { rowOptions } from "../../../constants/rowOptions";
import debounce from "../../../helpers/debounce";
import useForm from "../../../hooks/useForm";

const ListUsers = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [rowsPerPage, setRowsPerPage] = useState<number>(rowOptions[0].value);
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<string>("");
  const [columns, setColumns] = useState<IColumn<IUser>[]>(initialUsersColumns);

  const { values, handleInputChange, setFormValue, reset } =
    useForm(initialUserState);

  //* Obtener usuarios
  const fetchUsers = useCallback(async () => {
    if (searchTerm) {
      await searchUsers({
        query: searchTerm,
        page,
        limit: rowsPerPage,
        setUsers,
        setTotalUsers,
        setTotalPages,
      });
    } else {
      await getListUsers({
        page,
        limit: rowsPerPage,
        setUsers,
        setTotalUsers,
        setTotalPages,
      });
    }
  }, [page, rowsPerPage, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleColumnVisibility = (key: string, visible: boolean) => {
    const updatedColumns = columns.map((column) =>
      column.key === key ? { ...column, visible } : column
    );
    setColumns(updatedColumns);
  };

  //* Crear usuario
  const openCreateModal = () => setIsCreateOpen(true);

  const handleCreate = async () => {
    const success = await createUser(values as INewUser);
    if (success) {
      closeCreateModal();
      fetchUsers();
      setIsCreateOpen(false);
    }
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
    reset();
  };

  //* Editar Usuario
  const openEditModal = async (id: number) => {
    setIsEditOpen(true);
    const user = await getUser(id);
    setFormValue(user);
  };

  const handleEdit = async () => {
    const success = await updateUser(values as IUser);
    if (success) {
      fetchUsers();
      reset(initialUserState);
      setIsEditOpen(false);
    }
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    reset(initialUserState);
  };

  //* Eliminar Usuario
  const openDeleteModal = async (user: IUser) => {
    setSelectedId(user.id);
    setSelectedElement(user.name);
    setIsDeleteOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleteOpen(false);
    const success = await deleteUser(selectedId as number);
    if (success) {
      fetchUsers();
      setSelectedId(null);
      setSelectedElement("");
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedId(null);
    setSelectedElement("");
  };

  const userForm = (
    <UserForm values={values as IUser} handleInputChange={handleInputChange} />
  );

  const newUserForm = (
    <NewUserForm
      values={values as INewUser}
      handleInputChange={handleInputChange}
    />
  );

  const searchUser = debounce({
    func: async (word: string) => {
      setSearchTerm(word);
      setPage(1);
    },
  });

  return (
    <section>
      <UserTable
        aria="Lista de usuarios"
        data={users}
        columns={columns}
        topContent={
          <UserHeader
            columns={columns}
            length={totalUsers}
            toggleColumnVisibility={toggleColumnVisibility}
            openCreateModal={openCreateModal}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            searchCallback={searchUser}
          />
        }
        bottomContent={
          <UserFootter page={page} total={totalPages} callback={setPage} />
        }
        renderActions={(item: IUser) => {
          return (
            <UserActions
              item={item}
              openEditModal={openEditModal}
              openDeleteModal={openDeleteModal}
            />
          );
        }}
      />

      <CustomModal
        title="Crear Usuario"
        isOpen={isCreateOpen}
        onClose={closeCreateModal}
        renderBody={newUserForm}
        onSave={handleCreate}
      />

      <CustomModal
        title="Editar Usuario"
        isOpen={isEditOpen}
        onClose={closeEditModal}
        renderBody={userForm}
        onSave={handleEdit}
      />

      <CustomModal
        title="Eliminar Usuario"
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onSave={handleDelete}
        renderBody={
          <p>
            ¿Estás seguro de que deseas eliminar el usuario{" "}
            <strong>{selectedElement}</strong>?
          </p>
        }
      />
    </section>
  );
};

export default ListUsers;
