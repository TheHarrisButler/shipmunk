import { AlchemyProvider } from "@shipengine/alchemy";
import { RootPortalProvider } from "@shipengine/elements";

export default function Popup(): JSX.Element {
  const getToken = async () => {
    const response = await fetch(`http://localhost:3002/get-token`, {
      method: "POST",
    });

    const token = await response.json();

    return token;
  };

  return (
    <AlchemyProvider
      baseURL={"https://elements-staging.shipengine.com"}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      brandName={"packlink" as any}
      cdnURL="https://cdn.packlink.com"
      getToken={getToken}
    >
      <RootPortalProvider>
        <div>
          <h1>Hello World</h1>
        </div>
      </RootPortalProvider>
    </AlchemyProvider>
  );
}
