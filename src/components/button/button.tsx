import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { createStyles } from "../../utils";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const styles = createStyles({
  defaultStyles: {
    display: "flex",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "16px",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    border: "none",
    outline: "none",
    backgroundColor: "white",
    color: "white",
  },
});

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button css={styles.defaultStyles} {...props}>
      {children}
    </button>
  );
};
