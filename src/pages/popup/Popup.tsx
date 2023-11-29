import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider, ViewShipment } from "@shipengine/elements";
import { createStyles } from "../../utils";
import { LabelsGrid } from "@src/components";
import React from "react";

export default function Popup(): JSX.Element {
  const getToken = async () => {
    const response = await fetch(`http://localhost:3002/generate-token`, {
      method: "GET",
    });

    const token = await response.json();

    return token;
  };

  const [selectedLabel, setSelectedLabel] = React.useState<null | string>(null);

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
    toolBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    grid: {},
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
          <div css={styles.toolBar}>
            <h1>Shipmunk</h1>
            <button>
              <span>Create new quick label</span>
            </button>
          </div>
          {selectedLabel && <ViewShipment.Element shipmentId={selectedLabel} />}
          <h2>Labels</h2>
          <div>
            <LabelsGrid setSelectedLabel={updateSelectedLabel} />
          </div>
        </div>
      </RootPortalProvider>
    </AlchemyProvider>
  );
}
