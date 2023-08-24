export const sortUsers = (users, sortField, sortDirection) => {
  return users.slice().sort((a, b) => {
    if (sortField === "id") {
      return sortDirection === "asc"
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    } else {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();

      if (fieldA < fieldB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    }
  });
};
