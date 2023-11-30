import { useEffect, useState } from "react";

export const WizardUI = () => {
  const [wizardData, setWizardData] = useState([]);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;
      const text = clickedElement.textContent || clickedElement.innerText;

      setWizardData((data) => [...data, text]);
    };
    document.addEventListener("click", handleClick);
    () => document.removeEventListener("click", handleClick);
  }, []);
  return <div>Wizard UI</div>;
};
