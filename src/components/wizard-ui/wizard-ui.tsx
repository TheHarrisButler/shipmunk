import { useEffect, useState } from "react";
import { useListWarehouses } from "@shipengine/alchemy";

import { AddressDisplay } from "@src/components/address-display/address-display";
import { useGetOrCreateShipment } from "./hooks/use-get-or-create-shipment";

export const WizardUI = ({ handleSubmit }) => {
  const [selectedText, setSelectedText] = useState("");
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);

  const { shipment, ...shipmentProps } = useGetOrCreateShipment();
  console.log({ shipment, shipmentProps });

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
        <button type="submit">
          {/* update button text */}
          Eject
        </button>
      </form>
    </div>
  );
};

const StepConfirmAddressFrom = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState("");
  const { data: warehouses, isLoading } = useListWarehouses();

  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  console.log({ warehouses });

  return (
    <div>
      {isLoading ? (
        <p>Loading your shipping address</p>
      ) : (
        <div>
          <h2>This is the address you&lsquo;re shipping from</h2>
          <AddressDisplay address={warehouses[0].originAddress} />
          <h3>is this correct?</h3>
          <input
            type="text"
            name="stepone"
            id="stepone"
            placeholder="Input Step One"
            value={inputData.length}
            onChange={handleChange}
          />
        </div>
      )}
      <button type="button" onClick={() => console.log("edit")}>
        No
      </button>
      <button type="button" onClick={() => next(inputData)}>
        Next
      </button>
    </div>
  );
};

const StepProvideAddressTo = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  return (
    <div>
      <h2>Select address to ship to</h2>
      <input
        type="text"
        name="steptwo"
        id="steptwo"
        placeholder="Input Step Two"
        value={inputData}
        onChange={handleChange}
      />
      <button type="button" onClick={() => next(inputData)}>
        Next
      </button>
    </div>
  );
};

const StepProvideDimensions = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  return (
    <div>
      <h2>Select the Dimensions</h2>
      <input
        type="text"
        name="stepthree"
        id="stepthree"
        placeholder="Input Step Three"
        value={inputData}
        onChange={handleChange}
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
