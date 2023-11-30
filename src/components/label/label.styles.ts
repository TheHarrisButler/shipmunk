import { createStyles } from "../../utils";

export const styles = createStyles({
  article: {
    ":hover": { backgroundColor: "rgba(159, 90, 253, 0.2)", cursor: "default" },
    // Set to full width of content modal
    width: "440px",
    height: "80px",
    backgroundColor: "rgba(159, 90, 253, 0.1)",
    marginBottom: "1px",
  },

  section: {
    padding: "0 10px",
    display: "grid",
    // super hard coded, but container will always be same size so works for now
    gridTemplateColumns: "40px 200px 100px 60px",
    alignItems: "center",
    gridGap: "10px",
    height: "100%",
    fontWeight: "bold",
  },

  image: {
    maxHeight: "40px",
    maxWidth: "40px",
  },

  hr: {
    color: "rgba(159, 90, 253, 0.6)",
  },
});
