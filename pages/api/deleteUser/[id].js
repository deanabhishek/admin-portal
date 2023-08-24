
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const usersFilePath = path.join(process.cwd(), "user.json");
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

      const updatedUsersData = usersData.filter((user) => user.id != id);
      fs.writeFileSync(
        usersFilePath,
        JSON.stringify(updatedUsersData, null, 2)
      );

      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "An error occurred while deleting user." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
