import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useListWarehouses,
  useUpdateSalesOrderShipment,
} from "@shipengine/alchemy";

import { AddressDisplay } from "@src/components/address-display/address-display";
import { useGetOrCreateShipment } from "./hooks/use-get-or-create-shipment";
import { Input } from "@src/components/inputs/Input";

export const WizardUI = ({ handleSubmit }) => {
  const [selectedText, setSelectedText] = useState("");
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);

  const { data: warehouses, isLoading: warehousesLoading } =
    useListWarehouses();
  const { shipment } = useGetOrCreateShipment(undefined);
  const { error: updateShipmentErrors, mutateAsync: updateShipment } =
    useUpdateSalesOrderShipment();

  useEffect(() => {
    const handleSelection = (event) => {
      // const clickedElement = event.target;
      // const text = clickedElement.textContent || clickedElement.innerText;
      const text = document.getSelection()?.toString();

      setSelectedText(text);
    };
    document.addEventListener("selectionchange", handleSelection);
    () => document.removeEventListener("selectionchange", handleSelection);
  }, []);

  const nextHandler = (stepData) => {
    setData((data) => [...data, stepData]);
    setStep(step + 1);
    setSelectedText("");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const addressData = data[1];
    const dimensionData = data[2];
    const weightData = data[3];

    // if (!addressData || !dimensionData || !weightData) {
    //   console.log("missing data");
    //   console.log({ addressData, dimensionData, weightData });
    //   return;
    // }

    const shipTo = {
      name: addressData?.["shipto-name"],
      addressLine1: addressData?.["shipto-address"],
      postalCode: addressData?.["shipto-postalcode"],
      stateProvince: addressData?.["shipto-state"],
      cityLocality: addressData?.["shipto-city"],
      countryCode: addressData?.["shipto-country"],
    };

    const createShipTo = (shipTo) => {
      const obj = {};
      if (shipTo?.name) obj.name = shipTo.name;
      if (shipTo?.addressLine1) obj.addressLine1 = shipTo.addressLine1;
      if (shipTo?.postalCode) obj.postalCode = shipTo.postalCode;
      if (shipTo?.stateProvince) obj.stateProvince = shipTo.stateProvince;
      if (shipTo?.cityLocality) obj.cityLocality = shipTo.cityLocality;
      if (shipTo?.countryCode) obj.countryCode = shipTo.countryCode;
      return obj;
    };

    const createDimensions = (dimensions) => {
      const obj = {};
      if (dimensions?.height) obj.height = dimensions.height;
      if (dimensions?.length) obj.length = dimensions.length;
      if (dimensions?.width) obj.width = dimensions.width;
      if (dimensions?.unit) obj.unit = dimensions.unit;
      return obj;
    };

    const createWeight = (weight) => {
      const obj = {};
      let pounds = 0;
      let ounces = 0;
      if (weight?.pounds) pounds = +weight.pounds * 16;
      if (weight?.ounces) ounces = +weight.ounces;
      if (weight?.unit) obj.unit = weight.unit;

      obj.value = pounds + ounces;
      return obj;
    };

    const createPackages = (packages) => {
      const obj = {};
      if (packages?.dimensions) obj.dimensions = packages.dimensions;
      if (packages?.weight) obj.weight = packages.weight;
      return obj;
    };

    const dimensions = {
      height: dimensionData?.["dimensions-height"],
      length: dimensionData?.["dimensions-length"],
      width: dimensionData?.["dimensions-width"],
      unit: "inch",
    };

    const weight = {
      pounds: weightData?.["weight-pounds"],
      ounces: weightData?.["weight-ounces"],
      unit: "ounce",
    };

    const packages = {
      dimensions: createDimensions(dimensions),
      weight: createWeight(weight),
    };

    const updatedShipment = await updateShipment({
      ...shipment,
      shipTo: createShipTo(shipTo),
      packages: [createPackages(packages)],
    });

    handleSubmit(updatedShipment);
  };

  return (
    <div>
      <h1>Welcome to the Label Wizard UI</h1>
      <form onSubmit={submitHandler}>
        {
          {
            1: (
              <StepConfirmAddressFrom
                next={nextHandler}
                selectedText={selectedText}
                warehouses={warehouses}
                isLoading={warehousesLoading}
              />
            ),
            2: (
              <StepProvideAddressTo
                next={nextHandler}
                selectedText={selectedText}
              />
            ),
            3: (
              <StepProvideDimensions
                next={nextHandler}
                selectedText={selectedText}
              />
            ),
            4: (
              <StepProvideWeight
                next={nextHandler}
                selectedText={selectedText}
              />
            ),
          }[step]
        }
        <button
          type="submit"
          style={{ marginTop: "2rem" }}
          disabled={step <= 2}
          onClick={() => console.log("creating shipment")}
        >
          Create Shipment
        </button>
      </form>
    </div>
  );
};

const StepConfirmAddressFrom = ({
  next,
  selectedText = "",
  warehouses,
  isLoading,
}) => {
  const [inputData, setInputData] = useState("");
  const [needEdit, setNeedEdit] = useState(false);

  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  return (
    <div>
      {isLoading ? (
        <p>Loading your shipping address</p>
      ) : (
        <div>
          <h2>This is the address you&lsquo;re shipping from</h2>
          <AddressDisplay address={warehouses[0].originAddress} />
          <h3>is this correct?</h3>
          {needEdit && (
            <input
              type="text"
              name="stepone"
              id="stepone"
              placeholder="Input Step One"
              value={inputData}
              onChange={handleChange}
            />
          )}
        </div>
      )}
      <Input type="button" onClick={() => setNeedEdit(!needEdit)} value="No" />
      <Input
        type="button"
        onClick={(e) => {
          e.preventDefault();
          next(inputData);
        }}
        value="Next"
      />
    </div>
  );
};

const StepProvideAddressTo = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState<Record<string, any>>({});
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (name, value) =>
    setInputData({ ...inputData, [name]: value });

  const isShopifyPage = useMemo(() => {
    return (
      location.host.endsWith("shopify.com") || // actual shopify
      ((location.host === "" || location.host.split(":")[0] === "localhost") &&
        document.title.endsWith("Shopify"))
    );
  }, []);

  const scrapeShopifyAddress = useCallback(() => {
    try {
      const shopifyAddressContentElement =
        (
          ([
            ...document.querySelectorAll('[class^="Polaris-InlineStack"]'),
          ].find((elem) => elem.textContent == "Shipping address")
            ?.nextSibling ?? undefined) as HTMLElement | undefined
        )?.querySelector('[class^="Polaris-TextContainer"]') ?? undefined;
      const borderStyleTarget =
        shopifyAddressContentElement?.firstChild ?? undefined;
      const borderStyleTargetStyle =
        borderStyleTarget instanceof HTMLElement
          ? borderStyleTarget.style
          : undefined;
      if (borderStyleTargetStyle !== undefined) {
        const blinker = async () => {
          const previousBoxShadow = borderStyleTargetStyle.boxShadow;
          const blinkBoxShadow =
            "0 0 0 2px rgba(255,0,0,.8),0 0 0 4px rgba(255,255,255,.8),0 0 0 6px rgba(255,0,0,0.8)";

          for (let i = 0; i < 3; i++) {
            borderStyleTargetStyle.boxShadow = blinkBoxShadow;
            await new Promise((resolve) => setTimeout(resolve, 250));
            borderStyleTargetStyle.boxShadow = previousBoxShadow;
            await new Promise((resolve) => setTimeout(resolve, 250));
          }
        };

        void blinker();
      }

      const addressText =
        shopifyAddressContentElement instanceof HTMLElement
          ? shopifyAddressContentElement.innerText
          : undefined;
      const magicAddressLines = addressText?.split("\n");
      if (magicAddressLines !== undefined) {
        const handleChange = (name, value) =>
          setInputData((prior) => ({ ...prior, [name]: value }));
        handleChange("shipto-name", magicAddressLines[0]);
        handleChange("shipto-address", magicAddressLines[1]);
        const cityStateZip = magicAddressLines[2].split(" ");
        handleChange("shipto-city", cityStateZip[0]);
        handleChange("shipto-state", cityStateZip[1]);
        handleChange("shipto-postalcode", cityStateZip[2]);
        // hack
        if (magicAddressLines[3] === "United States") {
          handleChange("shipto-country", "US");
        } else {
          alert("please enter country manually");
        }
      }
    } catch {
      alert("failed to scrape");
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
      <h2>Select address to ship to</h2>
      Name Country Address Line City State Postal Code
      {isShopifyPage && (
        <Input
          type="button"
          onClick={scrapeShopifyAddress}
          value="Scrape Shopify Address"
        />
      )}
      <Input
        autoFocus
        type="text"
        name="shipto-name"
        id="shipto-name"
        placeholder="Provide Name"
        value={inputData["shipto-name"]}
        onChange={(event) => handleChange("shipto-name", event.target.value)}
      />
      <Input
        type="text"
        name="shipto-country"
        id="shipto-country"
        placeholder="Provide the country"
        value={inputData["shipto-country"]}
        onChange={(event) =>
          handleChange("shipto-countrty", event.target.value)
        }
      />
      <Input
        type="text"
        name="shipto-address"
        id="shipto-address"
        placeholder="Provide the Address"
        value={inputData["shipto-address"]}
        onChange={(event) => handleChange("shipto-address", event.target.value)}
      />
      <Input
        type="text"
        name="shipto-city"
        id="shipto-city"
        placeholder="Provide the City"
        value={inputData["shipto-city"]}
        onChange={(event) => handleChange("shipto-city", event.target.value)}
      />
      <Input
        type="text"
        name="shipto-state"
        id="shipto-state"
        placeholder="Provide the State"
        value={inputData["shipto-state"]}
        onChange={(event) => handleChange("shipto-state", event.target.value)}
      />
      <Input
        type="text"
        name="shipto-postalcode"
        id="shipto-postalcode"
        placeholder="Provide the Postal Code"
        value={inputData["shipto-postalcode"]}
        onChange={(event) =>
          handleChange("shipto-postalcode", event.target.value)
        }
      />
      <Input
        type="button"
        onClick={(e) => {
          e.preventDefault();
          next(inputData);
        }}
        value="Next"
      />
    </div>
  );
};

const StepProvideDimensions = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState({});
  const [focusField, setFocusField] = useState();
  const [lastFocusField, setLastFocusField] = useState();
  useEffect(() => {
    if (selectedText.length && focusField == lastFocusField) {
      setInputData({
        ...inputData,
        [focusField]: selectedText,
      });
    }
  }, [selectedText, focusField]);

  const handleFocus = (event) => {
    // setLastFocusField(focusField);
    setFocusField(event.target.name);
  };

  const handleBlur = () => {
    setLastFocusField(focusField);
  };

  const handleChange = (name, value) =>
    setInputData({ ...inputData, [name]: value });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
      <h2>Select the Dimensions</h2>
      <Input
        autoFocus
        type="number"
        name="dimensions-length"
        id="dimensions-length"
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Provide Length"
        value={inputData["dimensions-length"]}
        onChange={(event) =>
          handleChange("dimensions-length", event.target.value)
        }
      />
      <Input
        type="number"
        name="dimensions-width"
        id="dimensions-width"
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Provide Width"
        value={inputData["dimensions-width"]}
        onChange={(event) =>
          handleChange("dimensions-width", event.target.value)
        }
      />
      <Input
        type="number"
        name="dimensions-height"
        id="dimensions-height"
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Provide Height"
        value={inputData["dimensions-height"]}
        onChange={(event) =>
          handleChange("dimensions-height", event.target.value)
        }
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          next(inputData);
        }}
      >
        Next
      </button>
    </div>
  );
};

const StepProvideWeight = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState({});
  const [focusField, setFocusField] = useState();
  const [lastFocusField, setLastFocusField] = useState();
  useEffect(() => {
    if (selectedText.length && focusField == lastFocusField) {
      setInputData({
        ...inputData,
        [focusField]: selectedText,
      });
    }
  }, [selectedText, focusField]);

  const handleFocus = (event) => {
    // setLastFocusField(focusField);
    setFocusField(event.target.name);
  };

  const handleBlur = () => {
    setLastFocusField(focusField);
  };

  const handleChange = (name, value) =>
    setInputData({ ...inputData, [name]: value });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
      <h2>Select Weight</h2>
      <Input
        autoFocus
        type="number"
        name="weight-pounds"
        id="weight-pounds"
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Provide Weight in Pounds"
        value={inputData["weight-pounds"]}
        onChange={(event) => handleChange("weight-pounds", event.target.value)}
      />
      <Input
        type="number"
        name="weight-ounces"
        id="weight-ounces"
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Provide Weight in Ounces"
        value={inputData["weight-ounces"]}
        onChange={(event) => handleChange("weight-ounces", event.target.value)}
      />

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          next(inputData);
        }}
      >
        Next
      </button>
    </div>
  );
};
