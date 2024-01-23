import { NavigationKey } from "@src/pages/content/content";
import { Shipmunk } from "../shipmunk/shipmunk";
import { styles, getToolBarButtonStyles } from "./tool-bar-styles";
import { Icon, IconSize } from "@shipengine/giger";
import { IconNames } from "@shipengine/giger-theme";
import { ToolTip } from "../tooltip/tooltip";
import { Button } from "../button/button";

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
    <div css={styles.toolBar} className="draggable_handle">
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
        <ToolTip content={"Label Wizard"}>
          <Button
            css={getToolBarButtonStyles(navigationKey === "wizard")}
            onClick={() => onNavigate("wizard")}
          >
            <Icon
              css={styles.icons}
              name={IconNames.UPGRADE}
              size={IconSize.SIZE_REGULAR}
            />
          </Button>
        </ToolTip>
        <ToolTip content={"History"}>
          <Button
            css={getToolBarButtonStyles(navigationKey === "labels")}
            onClick={() => onNavigate("labels")}
          >
            <Icon
              css={styles.icons}
              name={IconNames.LIST}
              size={IconSize.SIZE_REGULAR}
            />
          </Button>
        </ToolTip>
        <ToolTip content={"Buy Label"}>
          <Button
            css={getToolBarButtonStyles(navigationKey === "purchase")}
            onClick={() => onNavigate("purchase")}
          >
            <Icon
              css={styles.icons}
              name={IconNames.FAST_DELIVERY}
              size={IconSize.SIZE_REGULAR}
            />
          </Button>
        </ToolTip>
        <ToolTip content={"Settings"}>
          <Button
            css={getToolBarButtonStyles(navigationKey === "settings")}
            onClick={() => onNavigate("settings")}
          >
            <Icon
              css={styles.icons}
              name={IconNames.SETTINGS}
              size={IconSize.SIZE_REGULAR}
            />
          </Button>
        </ToolTip>

        <Button css={getToolBarButtonStyles(false)} onClick={onClose}>
          <Icon
            css={styles.icons}
            name={IconNames.CLOSE}
            size={IconSize.SIZE_REGULAR}
          />
        </Button>
      </div>
    </div>
  );
};
