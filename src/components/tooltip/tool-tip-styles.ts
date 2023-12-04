import { createStyles } from "../../utils";

export const styles = createStyles({
  tooltipContainer: {
    position: "relative",
    display: "inline-block",
  },
  tooltipBaseClasses: {
    textAlign: "center",
    position: "absolute",
    opacity: 0,
    marginRight: "calc(100% / 2)",
    width: "auto",
    whiteSpace: "nowrap",
    visibility: "hidden",
    zIndex: 10000,
    marginTop: "0.5rem",
    backgroundColor: "#343541",
    color: "#fff",
    padding: "0.25rem",
    borderRadius: "0.25rem",
  },
  transformedState: {
    opacity: 1,
    visibility: "visible",
    transitionProperty: "opacity, visibility",
    transitionTimingFunction: "ease-in-out",
    transitionDuration: "0.15s",
  },
  arrow: {
    content: " ",
    position: "absolute",
    bottom: "100%",
    left: "50%",
    marginLeft: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "transparent transparent #343541 transparent",
  },
});
