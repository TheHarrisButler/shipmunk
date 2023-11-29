import { createStyles } from "../../utils";

export const styles = createStyles({
  article: {
    ":hover": { backgroundColor: "rgba(159, 90, 253, 0.2)", cursor: "pointer" },
    border: "1px solid rgba(159, 90, 253, 0.6)",
    borderRadius: "4px",
    // Set to full width of content modal
    minWidth: "440px",
    height: "80px",
    // position: "relative",
  },

  section: {
    padding: "0 20px",
    height: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // flexWrap: "nowrap",
  },

  image: {
    maxHeight: "40px",
    maxWidth: "40px",
  },
});
