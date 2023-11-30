import { useState, useCallback } from "react";
import { AlchemyProvider } from "@shipengine/alchemy";
import { Button } from "@packlink/giger";
import { RootPortalProvider } from "@shipengine/elements";
import { createStyles } from "../../utils";
<<<<<<< HEAD
import { useState } from "react";
=======
import {
  ElementSidePanel,
  ElementList,
  ElementListValue,
  Shipmunk,
} from "@src/components";
>>>>>>> main

export default function Popup(): JSX.Element {
  const [currentElementName, setCurrentElementName] =
    useState<ElementListValue>(ElementList.PURCHASE_LABEL_ELEMENT);

  const [isElementOpen, setIsElementOpen] = useState<boolean>(false);

  //const [selectedLabelID, setSelectedLabelID] = useState<string | undefined>();

  const toggleIsElementOpen = useCallback(
    () => setIsElementOpen((isElementOpen) => !isElementOpen),
    []
  );

  const getToken = async () => {
    const response = await fetch(`http://localhost:3002/generate-token`, {
      method: "GET",
    });

    const token = await response.json();

    return token;
  };

  const styles = createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid rgb(222, 222, 222)",
      padding: "4px 0px 4px 16px",
      justifyContent: "space-between",
    },
    onboardButton: {
      justifyContent: "center",
      marginTop: "1rem",
      width: "5rem",
    },
  });

  const [wizardMode, setWizardMode] = useState(false);

  return (
    <AlchemyProvider
      baseURL={"https://elements-staging.shipengine.com"}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      brandName={"paypal_shipcenter" as any}
      cdnURL="https://cdn.packlink.com"
      getToken={getToken}
    >
      <RootPortalProvider>
        <div css={styles.container}>
<<<<<<< HEAD
          <div css={styles.toolBar}>
            <h1>Shipmunk</h1>
            <div>
              <div>
                <button>
                  <span>Create new quick label</span>
                </button>
              </div>
              <div onClick={() => setWizardMode(!wizardMode)}>
                <button>Label Wizard</button>
              </div>
            </div>
          </div>
          {wizardMode && (
            <div>
              <h2>Welcome to guided mode</h2>
              <h3>Instructions</h3>
              <p>Step 1</p>
              <p>Step 2</p>
              <p>Step 3</p>
              <button
                onClick={() => {
                  void chrome.runtime.sendMessage({ wizard: true });
                  window.close();
                }}
              >
                Get started
              </button>
              <input type="checkbox" id="no-tutorial" name="no-tutorial" />
              <label htmlFor="no-tutorial">Dont show this screen again</label>
=======
          <ElementSidePanel
            elementName={currentElementName}
            isOpen={isElementOpen}
            //labelId={selectedLabelID}
            onClose={() => setIsElementOpen(false)}
            onElementComplete={(nextElement, currentElement) => {
              if (currentElement === ElementList.PURCHASE_LABEL_ELEMENT) {
                // Probably need to refetch labels here
              }

              if (nextElement != ElementList.PURCHASE_LABEL_ELEMENT) {
                setCurrentElementName(nextElement);

                if (nextElement !== ElementList.VIEW_SHIPMENT_ELEMENT) {
                  setIsElementOpen(false);
                }
              } else {
                setIsElementOpen(false);
              }
            }}
          />
          {!isElementOpen && (
            <div css={styles.toolbar}>
              <h1>Shipmunk</h1>
              <div
                css={{
                  width: "100px",
                  height: "100px",
                }}
              >
                <Shipmunk />
              </div>
              <Button
                css={styles.onboardButton}
                isFullWidth={false}
                onClick={toggleIsElementOpen}
              >
                <span>Create label</span>
              </Button>
>>>>>>> main
            </div>
          )}
          <div>{/** TODO: Add labels grid here */}</div>
        </div>
      </RootPortalProvider>
    </AlchemyProvider>
  );
}
