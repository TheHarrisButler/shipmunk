import { useState, useCallback, useEffect } from "react";
import { Shipmunk, ToolBar } from "../../components";
import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider, PurchaseLabel } from "@shipengine/elements";
import { styles, getOverFlowContainerStyles } from "./content-styles";
import { WizardUI } from "@src/components/wizard-ui/wizard-ui";
import { noop } from "lodash";

// dirty monkeypatch giger theme into emotion theme
declare module "@emotion/react" {
  export interface Theme {
    getCardStyle: () => {
      backgroundColor: string;
    };
  }
}

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayWizard, setDisplayWizard] = useState(false); // default should be for this to be the landing, use state for development
  const [textSelection, setTextSelection] = useState("");

  // handle text selection
  useEffect(() => {
    const handleTextSelect = (_event: React.MouseEvent) => {
      const selectedText = window.getSelection()?.toString() ?? "";

      if (selectedText?.length) {
        setTextSelection(selectedText);
        // automatically open the menu if its not open yet
        if (!isOpen) setIsOpen(true);
      }
    };
    document.addEventListener("mouseup", handleTextSelect);

    return () => document.removeEventListener("mouseup", handleTextSelect);
  }, []);

  const getToken = async () => {
    const response = await fetch(`http://localhost:3002/generate-token`, {
      method: "GET",
    });

    const token = await response.json();

    return token;
  };

  const handleWizardSubmit = useCallback(() => noop, []);

  const toggleIsElementOpen = useCallback(
    () => setIsOpen((isOpen) => !isOpen),
    []
  );

  return (
    <div
      css={{
        zIndex: 9999,
        position: "fixed",
        bottom: "50px",
        right: "45px",
      }}
    >
      <AlchemyProvider
        baseURL={"https://elements-staging.shipengine.com"}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        brandName={"paypal_shipcenter" as any}
        cdnURL="https://cdn.packlink.com"
        getToken={getToken}
      >
        <RootPortalProvider>
          <div css={styles.contentContainer}>
            {isOpen && (
              <div css={getOverFlowContainerStyles(isOpen)}>
                <ToolBar onClose={toggleIsElementOpen} />
                <div css={styles.elementContainer}>
                  <PurchaseLabel.Element
                    features={{
                      presentation: { poweredByShipEngine: true },
                      rateForm: { enableFunding: true },
                    }}
                    onLabelCreateSuccess={() => {
                      // TODO
                    }}
                    printLabelLayout={
                      "letter" // : '4x6'
                    }
                  />
                </div>
              </div>
            )}
            {!isOpen && (
              <button css={styles.pillButton} onClick={toggleIsElementOpen}>
                <div
                  css={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    css={{
                      cursor: "pointer",
                      width: "50px",
                      height: "50px",
                      paddingRight: "1rem",
                    }}
                  >
                    <Shipmunk />
                  </div>
                  <span>Get Shipping labels</span>
                </div>
              </button>
            )}
          </div>
        </RootPortalProvider>
      </AlchemyProvider>
    </div>
  );
};
