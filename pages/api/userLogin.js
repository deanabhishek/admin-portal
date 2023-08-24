// pages/api/userLogin.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input, password } = req.body;

    try {
      const usersFilePath = path.join(process.cwd(), "user.json");
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));

      let user = null;
      const token = 123456789;

      if (input.includes("@")) {
        user = usersData.find((user) => user.email === input);
      } else {
        user = usersData.find((user) => user.username === input);
      }

      if (!user) {
        return res.status(404).json({ error: "User not found." });
      } else if (user.password !== password) {
        return res.status(401).json({ error: "Incorrect password." });
      } else if (user.role !== "admin") {
        return res
          .status(401)
          .json({ error: "You are not authorized to login." });
      } else {
        return res.status(200).json({
          status: "success",
          username: user.username,
          email: user.email,
          image: user.image,
          token: token,
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        status: "error",
        error: "An error occurred during login.",
      });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
