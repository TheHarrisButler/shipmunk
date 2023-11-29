import { createStyles } from "../../utils";

export const styles = createStyles({
  article: {
    border: "1px solid blue",
    borderRadius: "4px",
    // Set to full width of content modal
    minWidth: "440px",
    position: "relative",
  },

  section: {
    ":hover": { color: "blue", textDecoration: "none" },
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    // flexWrap: "nowrap",
  },

  image: {
    maxHeight: "26px",
    maxWidth: "26px",
  },
});
