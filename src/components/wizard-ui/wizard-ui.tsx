import { useEffect, useState } from "react";
import { useListWarehouses } from "@shipengine/alchemy";

import { AddressDisplay } from "@src/components/address-display/address-display";
import { useGetOrCreateShipment } from "./hooks/use-get-or-create-shipment";

export const WizardUI = ({ handleSubmit }) => {
  const [selectedText, setSelectedText] = useState("");
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);

  const { data: warehouses, isLoading: warehousesLoading } =
    useListWarehouses();

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

  const submitHandler = (event) => {
    event.preventDefault();

    console.log({
      data,
    });

    handleSubmit();
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
          disabled={step < 4}
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
      <button type="button" onClick={() => setNeedEdit(!needEdit)}>
        No
      </button>
      <button type="button" onClick={() => next(inputData)}>
        Next
      </button>
    </div>
  );
};

const StepProvideAddressTo = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState({});
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (name, value) =>
    setInputData({ ...inputData, [name]: value });

  return (
    <div>
      <h2>Select address to ship to</h2>
      Name Country Address Line City State Postal Code
      <input
        type="text"
        name="shipto-name"
        id="shipto-name"
        placeholder="Provide Name"
        value={inputData["shipto-name"]}
        onChange={(event) => handleChange("shipto-name", event.target.value)}
      />
      <input
        type="text"
        name="shipto-country"
        id="shipto-country"
        placeholder="Provide the country"
        value={inputData["shipto-countrty"]}
        onChange={(event) =>
          handleChange("shipto-countrty", event.target.value)
        }
      />
      <input
        type="text"
        name="shipto-address"
        id="shipto-address"
        placeholder="Provide the Address"
        value={inputData["shipto-address"]}
        onChange={(event) => handleChange("shipto-address", event.target.value)}
      />
      <input
        type="text"
        name="shipto-city"
        id="shipto-city"
        placeholder="Provide the City"
        value={inputData["shipto-city"]}
        onChange={(event) => handleChange("shipto-city", event.target.value)}
      />
      <input
        type="text"
        name="shipto-state"
        id="shipto-state"
        placeholder="Provide the State"
        value={inputData["shipto-state"]}
        onChange={(event) => handleChange("shipto-state", event.target.value)}
      />
      <input
        type="text"
        name="shipto-postalcode"
        id="shipto-postalcode"
        placeholder="Provide the Postal Code"
        value={inputData["shipto-postalcode"]}
        onChange={(event) =>
          handleChange("shipto-postalcode", event.target.value)
        }
      />
      <button type="button" onClick={() => next(inputData)}>
        Next
      </button>
    </div>
  );
};

const StepProvideDimensions = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState({});
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (name, value) =>
    setInputData({ ...inputData, [name]: value });

  return (
    <div>
      <h2>Select the Dimensions</h2>
      <input
        type="text"
        name="dimensions-legth"
        id="dimensions-legth"
        placeholder="Provide Length"
        value={inputData["dimensions-legth"]}
        onChange={(event) =>
          handleChange("dimensions-length", event.target.value)
        }
      />
      <input
        type="text"
        name="dimensions-width"
        id="dimensions-width"
        placeholder="Provide Width"
        value={inputData["dimensions-width"]}
        onChange={(event) =>
          handleChange("dimensions-width", event.target.value)
        }
      />
      <input
        type="text"
        name="dimensions-height"
        id="dimensions-height"
        placeholder="Provide Height"
        value={inputData["dimensions-height"]}
        onChange={(event) =>
          handleChange("dimensions-height", event.target.value)
        }
      />
      <button type="button" onClick={() => next(inputData)}>
        Next
      </button>
    </div>
  );
};

const StepProvideWeight = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  return (
    <div>
      <h2>Select Weight</h2>
      <input
        type="text"
        name="stepfour"
        id="stepfour"
        placeholder="Input Step Four"
        value={inputData}
        onChange={handleChange}
      />
      <button type="button" onClick={() => next(inputData)}>
        Next
      </button>
    </div>
  );
};
