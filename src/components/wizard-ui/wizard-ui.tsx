import { useEffect, useState } from "react";

export const WizardUI = ({ handleSubmit }) => {
  const [data, setData] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;
      const text = clickedElement.textContent || clickedElement.innerText;

      setData((data) => [...data, text]);
    };
    document.addEventListener("click", handleClick);
    () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div>
      <h1>Welcome to the Label Wizard UI</h1>
      <form
        onSubmit={(event) => {
          handleSubmit();
        }}
      >
        {
          {
            1: <StepOne />,
            2: <StepTwo />,
            3: <StepThree />,
          }[step]
        }
      </form>
    </div>
  );
};

const StepOne = () => {
  return <div>StepOne</div>;
};

const StepTwo = () => {
  return <div>StepTwo</div>;
};

const StepThree = () => {
  return <div>StepThree</div>;
};
