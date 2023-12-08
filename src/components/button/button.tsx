import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { createStyles } from "../../utils";
import { SerializedStyles } from "@emotion/react";

export type ButtonProps = {
  overrideStyles?: SerializedStyles;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const styles = createStyles({
  defaultStyles: {
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
  },
});

export const Button = ({ overrideStyles, children, ...props }: ButtonProps) => {
  return (
    <button css={[styles.defaultStyles, overrideStyles]} {...props}>
      {children}
    </button>
  );
};
