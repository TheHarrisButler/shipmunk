import { useState, useCallback, useEffect } from "react";
import { LabelsGrid, Shipmunk } from "../../components";
import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider, PurchaseLabel } from "@shipengine/elements";
import { createStyles } from "../../utils";
import { keyframes, Theme } from "@emotion/react";

// dirty monkeypatch giger theme into emotion theme
declare module "@emotion/react" {
  export interface Theme {
    getCardStyle: () => {
      backgroundColor: string;
    };
  }
}

import { WizardUI } from "@src/components/wizard-ui/wizard-ui";
import { noop, set } from "lodash";

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [textSelection, setTextSelection] = useState("");

  type NavigationKey = "wizard" | "history" | "purchase";
  const [navigationKey, setNavigationKey] = useState<NavigationKey>("wizard");

  const getCurrentNavigation = (navigatorKey: string) => {
    switch (navigatorKey) {
      case "wizard":
        return <WizardUI handleSubmit={handleWizardSubmit} />;
      case "purchase":
        return (
          <PurchaseLabel.Element
            features={{
              presentation: { poweredByShipEngine: true },
              rateForm: { enableFunding: true },
            }}
            onLabelCreateSuccess={() => {
              // TODO
              setNavigationKey("history");
            }}
            printLabelLayout={
              "letter" // : '4x6'
            }
          />
        );
      case "history":
        return <LabelsGrid />;
    }
  };

  // handle text selection
  useEffect(() => {
    const handleTextSelect = () => {
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

  const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
  `;

  const getStyles = (theme: Theme) =>
    createStyles({
      contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        input: {
          backgroundColor: theme.getCardStyle().backgroundColor,
        },
      },
      overflowContainer: {
        borderRadius: "10px",
        border: "1px solid #3498db",
        width: "480px",
        overflow: "hidden",
        backgroundColor: "#fff",
        transform: `translateY(${isOpen ? "0" : "100%"})`,
        animation: `${slideIn} 0.3s ease-out forwards`,
      },
      elementContainer: {
        display: "flex",
        height: "700px",
        overflowY: "auto",
        flexDirection: "column",
        alignItems: "center",
      },
      pillButton: {
        display: "inline-block",
        padding: "10px 20px",
        borderRadius: "30px",
        backgroundColor: "#3498db",
        color: "white",
        fontSize: "1rem",
        fontWeight: "bold",
        textAlign: "center",
        textDecoration: "none",
        cursor: "pointer",
        border: "none",
        outline: "none",
      },
      header: {
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgb(222, 222, 222)",
        padding: "4px 4px 4px 14px",
        justifyContent: "space-between",
      },
    });

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
          <div css={(theme) => getStyles(theme).contentContainer}>
            {isOpen && (
              <div css={(theme) => getStyles(theme).overflowContainer}>
                <div css={(theme) => getStyles(theme).header}>
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
                    <button onClick={() => setNavigationKey("wizard")}>
                      Label Wizard
                    </button>
                    <button onClick={() => setNavigationKey("history")}>
                      Label History
                    </button>
                    <button onClick={() => setNavigationKey("purchase")}>
                      Purchase Label
                    </button>
                    <button onClick={toggleIsElementOpen}>X</button>
                  </div>
                </div>
                <div css={(theme) => getStyles(theme).elementContainer}>
                  {getCurrentNavigation(navigationKey)}
                </div>
              </div>
            )}
            {!isOpen && (
              <button
                css={(theme) => getStyles(theme).pillButton}
                onClick={() => toggleIsElementOpen()}
              >
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
