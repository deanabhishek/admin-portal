import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const usersFilePath = path.join(process.cwd(), "user.json");
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

      const totalCount = usersData.length; // Total count of all entries

      const { skip, limit } = req.query;
      const startIndex = parseInt(skip) || 0;
      const endIndex = startIndex + (parseInt(limit) || usersData.length);

      const paginatedUsers = usersData.slice(startIndex, endIndex);

      res.status(200).json({
        totalCount,
        users: paginatedUsers,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching users." });
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
