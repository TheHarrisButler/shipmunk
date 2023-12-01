import { createStyles } from "../../utils";

export const styles = createStyles({
  article: {
    ":hover": { backgroundColor: "rgba(30, 154, 255, 0.2)", cursor: "default" },
    // Set to full width of content modal
    width: "100%",
    height: "80px",
    backgroundColor: "rgba(30, 154, 255, 0.1)",
    marginBottom: "1px",
  },

  section: {
    padding: "0 14px",
    display: "grid",
    // super hard coded, but container will always be same size so works for now
    gridTemplateColumns: "40px 200px 100px 1fr",
    alignItems: "center",
    gridGap: "10px",
    height: "100%",
    fontWeight: "bold",
    fontSize: "14px",
  },

  image: {
    maxHeight: "30px",
    maxWidth: "30px",
  },
});
