// pages/api/getUserById/[id].js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const userId = req.query.id;

    try {
      const usersFilePath = path.join(process.cwd(), "user.json");
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

      const user = usersData.find((user) => user.id === parseInt(userId));

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      } else {
        return res.status(200).json(user);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching user." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
