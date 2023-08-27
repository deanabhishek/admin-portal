import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { allUsers, deleteUser } from "../api/user";
import { fetchAllUsers } from "./utils/apiUtils";
import DataTable from "react-data-table-component";
import RoleChangePopup from "./RoleChangePop";
import ConfirmationModal from "./confirmDelete";
import Popup from "../messages/PopUps";
import AddNewRole from "./AddNewRole";
import DataTableStyle from "./utils/DataTableStyle";
import Columns from "./utils/Columns";

function AdminPanel() {
  const router = useRouter();

  const [allUsersList, setAllUsersList] = useState([]);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [count, setCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [skip, limit, searchQuery, selectedUser, isDeleting]);

  const fetchUsers = async () => {
    const response = await fetchAllUsers(skip, limit);
    if (response.error) {
      setError(response.error);
    } else {
      setCount(response.totalCount);
      setAllUsersList(response.users);
    }
  };

  const handleRoleChangeClick = (user) => {
    setSelectedUser(user);
  };

  const onDeleteUser = async (userId) => {
    setUserToDelete(userId);
    setIsModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    setIsModalOpen(false);
    setIsDeleting(true);
    const response = await deleteUser(userToDelete);
    if (response.status === "success") {
      setUserToDelete(null);
      router.push("/dashboard");
    } else {
      setError(response.error);
    }
    setIsDeleting(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const handleSearch = (event) => {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    setSkip(0);
  };

  const filteredUsers = allUsersList.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const CustomPagination = () => {
    return (
      <div className="flex items-center justify-between mt-5 bg-white">
        {/* Rows per page dropdown */}
        <div className="flex items-center">
          <select
            className="p-[2px 3px 2px 3px] rounded-lg  border-gray-300 mr-2"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1); // Reset page when changing rows per page
            }}
          >
            <option value={5}>Show 5</option>
            <option value={10}>Show 10</option>
            <option value={20}>Show 20</option>
            <option value={50}>Show 50</option>
            <option value={count}>Show All</option>
          </select>
        </div>

        {/* Pagination buttons */}
        <div className="flex items-center px-2">
          <button
            className="pagination-left"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          ></button>
          <button
            className="pagination-left"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          ></button>
          <span className="mr-2">
            Page {currentPage} of {Math.ceil(count / limit)}
          </span>
          <button
            className="pagination-right"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(count / limit)}
          ></button>
          <button
            className="pagination-right"
            onClick={() => setCurrentPage(Math.ceil(count / limit))}
            disabled={currentPage === Math.ceil(count / limit)}
          ></button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#f4f4f5] p-5">
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="h-100 overflow-y-hidden overflow-x-scroll rounded-lg shadow max-w-7xl">
          {/* DataTable */}
          <DataTable
            striped
            columns={Columns.Columns(handleRoleChangeClick, onDeleteUser)}
            data={filteredUsers} // Use the fetched data for pagination
            pagination
            responsive
            customStyles={DataTableStyle}
            fixedHeader
            highlightOnHover
            paginationPerPage={limit}
            fixedHeaderScrollHeight="50vh"
            paginationDefaultPage={currentPage} // Set the initial page number
            paginationServer={true} // Use server-side pagination
            paginationTotalRows={count} // Total rows count
            onChangeRowsPerPage={(newLimit) => {
              setLimit(newLimit);
              setCurrentPage(1); // Reset to the first page when changing rows per page
            }}
            onChangePage={(page) => {
              setCurrentPage(page);
              setSkip((page - 1) * limit); // Set the new skip value
            }}
            paginationComponentOptions={{
              rowsPerPageText: "Users per page:",
              rangeSeparatorText: "of",
              noRowsPerPage: false,
              selectAllRowsItem: true,
              selectAllRowsItemText: "All",
            }}
            subHeader
            subHeaderComponent={
              <div className="flex items-center justify-between mb-4 w-full">
                <h2>Users</h2>
                <input
                  type="search"
                  placeholder="Search users..."
                  className="searchbar"
                  onChange={handleSearch}
                  value={searchQuery}
                />{" "}
              </div>
            }
            paginationComponent={CustomPagination}
          />

          {/* Role Change Popup */}
          {selectedUser && (
            <Popup
              isOpen={selectedUser !== null}
              onClose={() => setSelectedUser(null)}
            >
              <RoleChangePopup
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
              />
            </Popup>
          )}

          {/* Confirmation Modal */}
          <Popup isOpen={isModalOpen} onClose={closeModal}>
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={confirmDeleteUser}
            />
          </Popup>

          {/* Add New Role Popup */}
          <Popup isOpen={isAddRoleOpen} onClose={() => setIsAddRoleOpen(false)}>
            <AddNewRole />
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
