import { createStyles } from "../../utils";
import { css, SerializedStyles } from "@emotion/react";

export const getToolBarButtonStyles = (): SerializedStyles =>
  css({
    display: "flex",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    outline: "none",
    backgroundColor: "white",
    transition: "background-color 0.3s ease-in-out",
    ":hover": {
      backgroundColor: "#EFF2FC",
    },
  });

export const styles = createStyles({
  toolBar: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgb(222, 222, 222)",
    padding: "4px 4px 4px 14px",
    justifyContent: "space-between",
  },
  icons: {
    color: "#8A91A4",
  },
});
