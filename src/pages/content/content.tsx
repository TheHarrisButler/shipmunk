import { useState, useCallback } from "react";
import { Shipmunk, ToolBar } from "../../components";
import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider, PurchaseLabel } from "@shipengine/elements";
import { styles, getOverFlowContainerStyles } from "./content-styles";

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false);

  const getToken = async () => {
    const response = await fetch(`http://localhost:3002/generate-token`, {
      method: "GET",
    });

    const token = await response.json();

    return token;
  };

  const toggleIsElementOpen = useCallback(
    () => setIsOpen((isOpen) => !isOpen),
    []
  );

  return (
    <div
      css={{
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
              <button
                css={styles.pillButton}
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
