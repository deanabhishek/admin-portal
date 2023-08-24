import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, newRole } = req.body;

    try {
      const usersFilePath = path.join(process.cwd(), "user.json");
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

      const updatedUsersData = usersData.map((user) =>
        user.id == userId ? { ...user, role: newRole } : user
      );

      fs.writeFileSync(
        usersFilePath,
        JSON.stringify(updatedUsersData, null, 2)
      );
      const updatedUser = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
      const user = updatedUser.find((user) => user.id == userId);
      console.log(user, "user");
      return res.status(200).json({ status: "success", user });
    } catch (error) {
      console.error("Error updating user role:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating user role." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
