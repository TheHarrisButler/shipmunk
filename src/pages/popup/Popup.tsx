import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider } from "@shipengine/elements";
import { createStyles } from "../../utils";
import { LabelsGrid } from "@src/components";

export default function Popup(): JSX.Element {
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
          <h2>Labels</h2>
          <div>
            <LabelsGrid />
          </div>
        </div>
      </RootPortalProvider>
    </AlchemyProvider>
  );
}
