import { useEffect, useState } from "react";

export const WizardUI = ({ handleSubmit }) => {
  const [selectedText, setSelectedText] = useState("");
  const [step, setStep] = useState(1);
  const [data, setData] = useState([]);

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
            1: <StepOne next={nextHandler} selectedText={selectedText} />,
            2: <StepTwo next={nextHandler} selectedText={selectedText} />,
            3: <StepThree next={nextHandler} selectedText={selectedText} />,
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

const StepOne = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  return (
    <div>
      <h2>Step One</h2>
      <input
        type="text"
        name="stepone"
        id="stepone"
        placeholder="Input Step One"
        value={inputData}
        onChange={handleChange}
      />
      <button type="button" onClick={() => next(inputData)}>
        Next
      </button>
    </div>
  );
};

const StepTwo = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  return (
    <div>
      <h2>Step Two</h2>
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

const StepThree = ({ next, selectedText = "" }) => {
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    if (selectedText.length) {
      setInputData(selectedText);
    }
  }, [selectedText]);

  const handleChange = (event) => setInputData(event.target.value);

  return (
    <div>
      <h2>Step Three</h2>
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
