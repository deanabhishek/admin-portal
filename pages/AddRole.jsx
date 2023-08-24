import Navbar from "../component/Navbar";
import Sidebar from "../component/SideBar";
import AddNewRole from "../component/admin/AddNewRole.jsx";

function AddRole() {
  return (
    <>
      <Navbar />
      <div className="flex flex-row h-screen">
        <Sidebar />
        <AddNewRole />
      </div>
    </>
  );
}

export default AddRole;
