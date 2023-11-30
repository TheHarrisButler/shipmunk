import { useEffect, useState, useRef } from "react";

export const WizardUI = ({ handleSubmit }) => {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(1);

  const formRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;
      const text = clickedElement.textContent || clickedElement.innerText;

      setData((data) => [...data, text]);
    };
    document.addEventListener("click", handleClick);
    () => document.removeEventListener("click", handleClick);
  }, []);

  const nextHandler = () => setStep(step + 1);

  return (
    <div>
      <h1>Welcome to the Label Wizard UI</h1>
      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(formRef.current);

          handleSubmit();
        }}
      >
        {
          {
            1: <StepOne next={nextHandler} />,
            2: <StepTwo next={nextHandler} />,
            3: <StepThree next={nextHandler} />,
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

const StepOne = ({ next }) => {
  return (
    <div>
      <h2>Step One</h2>
      <input
        type="text"
        name="stepone"
        id="stepone"
        placeholder="Input Step One"
      />
      <button type="button" onClick={() => next()}>
        Next
      </button>
    </div>
  );
};

const StepTwo = ({ next }) => {
  return (
    <div>
      <h2>Step Two</h2>
      <input
        type="text"
        name="steptwo"
        id="steptwo"
        placeholder="Input Step Two"
      />
      <button type="button" onClick={() => next()}>
        Next
      </button>
    </div>
  );
};

const StepThree = ({ next }) => {
  return (
    <div>
      <h2>Step Three</h2>
      <input
        type="text"
        name="stepthree"
        id="stepthree"
        placeholder="Input Step Three"
      />
      <button type="button" onClick={() => next()}>
        Next
      </button>
    </div>
  );
};
