import { createStyles } from "../../utils";
import { css, SerializedStyles } from "@emotion/react";

export const getToolBarButtonStyles = (selected: boolean): SerializedStyles =>
  css({
    transition: "background-color 0.3s ease-in-out",
    ":hover": {
      backgroundColor: "#EFF2FC",
    },
    ...(selected && {
      backgroundColor: "#EFF2FC",
    }),
  });

export const styles = createStyles({
  toolBar: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgb(222, 222, 222)",
    padding: "4px 4px 4px 14px",
    justifyContent: "space-between",
    cursor: "move",
  },
  icons: {
    color: "#8A91A4",
  },
});
