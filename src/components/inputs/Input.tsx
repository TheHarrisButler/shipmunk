import {InputHTMLAttributes, DetailedHTMLProps} from "react";

export function Input(props: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return <input
    css={{
      border: "1px solid #ccc",
      borderRadius: "4px",
      padding: "8px 12px",
      fontSize: "16px",
      width: "100%",
      boxSizing: "border-box",
      "&:focus": {
        outline: "none",
        borderColor: "#aaa",
      },
    }}
    {...props}
  />
}
