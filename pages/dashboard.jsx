import { useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import AdminPanel from "../component/admin/AdminPanel";
import withAuth from "../middleware/withAuth";
import Sidebar from "../component/SideBar";

function DashBoard() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row h-screen">
        <Sidebar className="w-1/5" />
        <AdminPanel className="w-4/5" />
      </div>
    </div>
  );
}

export default withAuth(DashBoard);
