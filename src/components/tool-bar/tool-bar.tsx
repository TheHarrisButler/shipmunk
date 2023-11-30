import { Shipmunk } from "../shipmunk/shipmunk";
import { styles, getToolBarButtonStyles } from "./tool-bar-styles";

export type ToolBarProps = {
  onClose: () => void;
};

export const ToolBar = ({ onClose }: ToolBarProps) => {
  return (
    <div css={styles.toolBar}>
      <div
        css={{
          width: "30px",
          height: "30px",
        }}
      >
        <Shipmunk />
      </div>
      <div
        css={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button css={getToolBarButtonStyles}>Label Wizard</button>
        <button css={getToolBarButtonStyles}>Label History</button>
        <button onClick={onClose}>X</button>
      </div>
    </div>
  );
};
