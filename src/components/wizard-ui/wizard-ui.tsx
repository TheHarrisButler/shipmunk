import { useEffect, useState } from "react";

export const WizardUI = () => {
  const [data, setData] = useState([]);

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
      <h1>Wizard UI</h1>
      {data}
    </div>
  );
};
