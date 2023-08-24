import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, role, password } = req.body;
    console.log(req.body, "req.body");

    try {
      const usersFilePath = path.join(process.cwd(), "user.json");
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
      const id = usersData[usersData.length - 1].id + 1;
      console.log(id, "id");
      const newEntry = {
        id: id,
        username: firstName + lastName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        password: password,
        image:
          "https://lh3.googleusercontent.com/ogw/AGvuzYYsXTSKE7m-F3putHCdLweZEhz6HyG9DBafl2ih=s64-c-mo",
      };
      const updatedUsersData = [...usersData, newEntry];
      console.log(updatedUsersData, "updatedUsersData");
      fs.writeFileSync(
        usersFilePath,
        JSON.stringify(updatedUsersData, null, 2)
      );

      return res
        .status(200)
        .json({ message: "User information updated successfully." });
    } catch (error) {
      console.error("Error updating user information:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating user information." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}
