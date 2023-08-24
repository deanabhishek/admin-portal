import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { allUsers, deleteUser } from "../api/user";
import { fetchAllUsers } from "./utils/apiUtils";
import DataTable from "react-data-table-component";
import RoleChangePopup from "./RoleChangePop";
import ConfirmationModal from "./confirmDelete";
import Popup from "../messages/PopUps";
import AddNewRole from "./AddNewRole";

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

  // Columns for DataTable
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
    },
    {
      name: "First Name",
      selector: "firstName",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: "lastName",
      sortable: true,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="bg-lime-500 hover:bg-lime-400 text-white px-3 py-1 rounded"
          onClick={() => handleRoleChangeClick(row)}
        >
          Change Roles
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded"
          onClick={() => onDeleteUser(row.id)}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      ),
    },
  ];

  // Render the AdminPanel component
  return (
    <div className="w-full bg-white h-full">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-black">
            Admin Panel
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white px-3 py-1 rounded"
            onClick={() => setIsAddRoleOpen(true)}
          >
            Add New Role
          </button>
        </div>

        <div className="h-[75vh] overflow-y-scroll overflow-x-scroll">
          {/* DataTable */}
          <DataTable
            columns={columns}
            data={filteredUsers} // Use the fetched data for pagination
            pagination
            customStyles={{
              table: {
                maxHeight: "50vh", // Set maximum height to 50vh
                border: "1px solid #e2e8f0",
                backgroundColor: "#F7FAFC", // Set a light background color
              },
              tableWrapper: {
                overflowY: "scroll", // Make the content scrollable
              },
            }}
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
              <input
                type="search"
                placeholder="Search users..."
                className="p-2 border border-gray-300 rounded"
                style={{ backgroundColor: "#EDF2F7" }} // Set search input background color
                onChange={handleSearch}
                value={searchQuery}
              />
            }
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
