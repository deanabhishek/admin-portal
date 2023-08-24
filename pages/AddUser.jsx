import Navbar from "../component/Navbar";
import Sidebar from "../component/SideBar";
import NewUserForm from "../component/forms/NewUserForm";
import withAuth from "../middleware/withAuth";

function AddUser() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row h-screen">
        <Sidebar />
        <NewUserForm />
      </div>
    </div>
  );
}

export default withAuth(AddUser);
