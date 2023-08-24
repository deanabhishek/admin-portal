import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUserById, updateRole } from "../../component/api/user";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/SideBar";

const ChangeRolePage = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const fetchUser = async (userId) => {
    try {
      const response = await getUserById(userId);
      console.log(response);
      if (response.id) {
        setUser(response);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLoading(false);
    }
  };

  const handleRoleChange = async () => {
    setIsUpdating(true);
    try {
      const updatedUser = await updateRole(userId, newRole); // Implement this API function
      console.log(updatedUser);
      if (updatedUser.status === "success") {
        setUser(updatedUser.data);
        setNewRole("");
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
    setIsUpdating(false);
    setIsLoading(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-row h-screen">
        <Sidebar />

        <div className="flex flex-col items-center justify-center h-screen w-full">
          <h1 className="text-3xl font-bold mb-4">Change User Role</h1>
          {user && (
            <div className="bg-black p-8 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-xl font-semibold mb-2">{user.username}</h2>
              <p>Current Role: {user.role}</p>
              <label className="mt-4">
                New Role:
                <input
                  type="text"
                  className="mt-1 p-2 border rounded-md w-full bg-black text-white"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </label>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleRoleChange}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Change Role"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeRolePage;
