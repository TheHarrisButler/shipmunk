import { NavigationKey } from "@src/pages/content/content";
import { Shipmunk } from "../shipmunk/shipmunk";
import { styles, getToolBarButtonStyles } from "./tool-bar-styles";
import { Icon, IconSize } from "@packlink/giger";
import { IconNames } from "@packlink/giger-theme";

export type ToolBarProps = {
  navigationKey: NavigationKey;
  onClose: () => void;
  onNavigate: (key: NavigationKey) => void;
};

export const ToolBar = ({
  navigationKey,
  onClose,
  onNavigate,
}: ToolBarProps) => {
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
        <button
          css={getToolBarButtonStyles(navigationKey === "wizard")}
          onClick={() => onNavigate("wizard")}
        >
          <Icon
            css={styles.icons}
            name={IconNames.UPGRADE}
            size={IconSize.SIZE_REGULAR}
          />
        </button>
        <button
          css={getToolBarButtonStyles(navigationKey === "labels")}
          onClick={() => onNavigate("labels")}
        >
          <Icon
            css={styles.icons}
            name={IconNames.LIST}
            size={IconSize.SIZE_REGULAR}
          />
        </button>
        <button
          css={getToolBarButtonStyles(navigationKey === "purchase")}
          onClick={() => onNavigate("purchase")}
        >
          <Icon
            css={styles.icons}
            name={IconNames.FAST_DELIVERY}
            size={IconSize.SIZE_REGULAR}
          />
        </button>
        <button css={getToolBarButtonStyles(false)} onClick={onClose}>
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
