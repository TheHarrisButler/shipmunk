import { createStyles } from "../../utils";
import { keyframes, css, SerializedStyles } from "@emotion/react";

const slideIn = keyframes`
from {
  transform: translateY(100%);
}
to {
  transform: translateY(0);
}
`;

export const getOverFlowContainerStyles = (isOpen: boolean): SerializedStyles =>
  css({
    borderRadius: "10px",
    border: "1px solid #EFF2FC",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    width: "480px",
    overflow: "hidden",
    backgroundColor: "#fff",
    transform: `translateY(${isOpen ? "0" : "100%"})`,
    animation: `${slideIn} 0.3s ease-out forwards`,
  });

export const styles = createStyles({
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  elementContainer: {
    display: "flex",
    height: "700px",
    overflowY: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "1em",
  },
  pillButton: {
    display: "flex",
    padding: "10px 20px",
    borderRadius: "30px",
    backgroundColor: "#3498db",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    outline: "none",
  },
  header: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid rgb(222, 222, 222)",
    padding: "4px 4px 4px 14px",
    justifyContent: "space-between",
  },
});
