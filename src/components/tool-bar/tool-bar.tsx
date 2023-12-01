import { Shipmunk } from "../shipmunk/shipmunk";
import { styles, getToolBarButtonStyles } from "./tool-bar-styles";
import { Icon, IconSize } from "@packlink/giger";
import { IconNames } from "@packlink/giger-theme";

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
        <button css={getToolBarButtonStyles}>
          <Icon
            css={styles.icons}
            name={IconNames.UPGRADE}
            size={IconSize.SIZE_REGULAR}
          />
        </button>
        <button css={getToolBarButtonStyles}>
          <Icon
            css={styles.icons}
            name={IconNames.LIST}
            size={IconSize.SIZE_REGULAR}
          />
        </button>
        <button css={getToolBarButtonStyles}>
          <Icon
            css={styles.icons}
            name={IconNames.FAST_DELIVERY}
            size={IconSize.SIZE_REGULAR}
          />
        </button>
        <button css={getToolBarButtonStyles} onClick={onClose}>
          <Icon
            css={styles.icons}
            name={IconNames.CLOSE}
            size={IconSize.SIZE_REGULAR}
          />
        </button>
      </div>
    </div>
  );
};
