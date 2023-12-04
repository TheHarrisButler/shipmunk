import { ReactNode, useState } from "react";
import { styles } from "./tool-tip-styles";

export type ToolTipProps = {
  children: ReactNode;
  content: string;
};

export const ToolTip = ({ children, content }: ToolTipProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      css={styles.tooltipContainer}
    >
      {children}
      <div
        css={[
          styles.tooltipBaseClasses,
          isOpen && styles.transformedState,
          isOpen && { transitionDelay: "1.0s" },
        ]}
      >
        <div css={styles.arrow} />
        {content}
      </div>
    </div>
  );
};
