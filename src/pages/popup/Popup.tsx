import { useState, useCallback } from "react";
import { AlchemyProvider } from "@shipengine/alchemy";
import { Button } from "@packlink/giger";
import { RootPortalProvider } from "@shipengine/elements";
import { createStyles } from "../../utils";
import {
  ElementSidePanel,
  ElementList,
  ElementListValue,
  Shipmunk,
  LabelsGrid,
} from "@src/components";

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

  const [selectedLabel, setSelectedLabel] = useState<null | string>(null);

  const updateSelectedLabel = (shipmentId: string) => {
    setSelectedLabel(shipmentId);
  };

  console.log("selected label", selectedLabel);

  const styles = createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
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
            </div>
          )}
          <div>
            {/** TODO: Add labels grid here */}
            <LabelsGrid setSelectedLabel={updateSelectedLabel} />
          </div>
        </div>
      </RootPortalProvider>
    </AlchemyProvider>
  );
}
