const DataTableStyle = {
  table: {
    style: {},
  },
  //
  headRow: {
    style: {
      backgroundColor: "#e5e5e6",
      color: "black",
      fontSize: "1.5rem",
      borderRadius: ".5rem",
    },
  },
  subHeader: {
    style: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      borderRadius: "1rem 1rem 1rem 1rem",
    },
  },

  headCells: {
    style: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: "black",
      borderRadius: "1rem",
    },
  },

  rows: {
    style: {
      border: "none",
      // backgroundColor: "black",
    },
    selectedHighlightStyle: {
      backgroundColor: "gray",
    },
    highlightOnHoverStyle: {
      backgroundColor: "#e5e5e6",
      color: "black",
      fontSize: "1rem",
    },

    stripedStyle: {
      backgroundColor: "#f8f8f8",
    },
  },
  cells: {
    style: {
      color: "black",
      fontSize: "1rem",
      borderRadius: "1rem",
    },
  },
  pagination: {
    style: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: "1rem",
      backgroundColor: "green",
    },
    pageButtonsStyle: {
      color: "#E2E8F0",
    },
  },
};

export default DataTableStyle;
