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
        <Sidebar />
        <AdminPanel />
      </div>
    </div>
  );
}

export default withAuth(DashBoard);
