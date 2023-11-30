import { useState, useCallback } from "react";
import { Label, LabelsGrid, Shipmunk } from "../../components";
import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider, PurchaseLabel } from "@shipengine/elements";
import { createStyles } from "../../utils";
import { keyframes } from "@emotion/react";

export const Content = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLabelGrid, setShowLabelGrid] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<null | string>(null);

  const updateSelectedLabel = (shipmentId: string) => {
    setSelectedLabel(shipmentId);
  };

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

  const toggleShowLabelGrid = useCallback(
    () => setShowLabelGrid((showLabelGrid) => !showLabelGrid),
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

  const styles = createStyles({
    contentContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
      justifyContent: "center",
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
              <div css={styles.overflowContainer}>
                <div css={styles.header}>
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
                    <button>Label Wizard</button>
                    <button onClick={toggleShowLabelGrid}>Label History</button>
                    <button onClick={toggleIsElementOpen}>X</button>
                  </div>
                </div>
                {showLabelGrid && (
                  <LabelsGrid setSelectedLabel={updateSelectedLabel} />
                )}
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
