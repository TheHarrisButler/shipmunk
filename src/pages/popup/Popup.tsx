import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider } from "@shipengine/elements";
import { createStyles } from "../../utils";
import { useState } from "react";

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
    },
    toolBar: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    grid: {},
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
            </div>
          )}
          <div>{/** TODO: Add labels grid here */}</div>
        </div>
      </RootPortalProvider>
    </AlchemyProvider>
  );
}
