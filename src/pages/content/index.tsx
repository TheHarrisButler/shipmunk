import { useState, useEffect } from "react";

import { createRoot } from "react-dom/client";
const div = document.createElement("div");
div.id = "__root";
document.body.appendChild(div);
let wizardInProgress = false;
const port = chrome.runtime.connect({ name: "selected-text" });
port.onMessage.addListener((msg) => {
  console.log({ msg });
});

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Options root element");
const root = createRoot(rootContainer);

try {
  console.log("content script loaded");

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log({ request, sender, sendResponse });
    if (request.active) startEngine();

    if (request.wizard) wizardProcess();
    wizardInProgress = true;
  });

  document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection()?.toString();

    if (selectedText?.length)
      try {
        console.log("Sending transmission");

        port.postMessage({ text: selectedText });
        console.log("Transmission Sent");

        !wizardInProgress && root.render(<SelectionMode text={selectedText} />);
      } catch (error) {
        console.error("Could not send message");
        console.error({ error });
      }
  });

  // document.addEventListener("click", (event) => {
  //   const clickedElement = event.target;
  //   const text = clickedElement.textContent || clickedElement.innerText;

  //   port.postMessage({ click: "clicked", text });
  // });
} catch (e) {
  console.error(e);
}

function wizardProcess() {
  root.render(<WizardMode port={port} />);
}

const WizardMode = ({ port }) => {
  const [steps, setSteps] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleClick = (event) => {
      const clickedElement = event.target;
      const text = clickedElement.textContent || clickedElement.innerText;

      setData((data) => [...data, text]);
      setSteps((steps) => steps + 1);

      // port.postMessage({ click: "clicked", text });
    };
    document.addEventListener("click", handleClick);
    () => document.removeEventListener("click", handleClick);
  }, []);

  const begoneWizard = () => {
    root.unmount();
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        display: "block",
        position: "fixed",
        top: "20%",
        left: "50%",
        width: "500px",
        height: "500px",
        color: "white",
      }}
    >
      <h1>I am wizard mode!</h1>
      <div>
        {steps < 3 ? (
          <p>click on field for step {steps + 1}</p>
        ) : (
          <button
            onClick={() => {
              port.postMessage({ wizardSubmit: true, data });
              begoneWizard();
            }}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

const SelectionMode = ({ text }) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        display: "block",
        position: "fixed",
        top: "20%",
        left: "50%",
        width: "500px",
        height: "1000px",
        color: "white",
      }}
    >
      <h1>You are in selection mode</h1>
      <h2>Create label from</h2>
      <p>{text}</p>
      <button>Correct</button>
    </div>
  );
};

function startEngine() {
  root.render(<Engine />);
}

const Engine = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        gap: "16px",
        position: "fixed",
        bottom: "80px",
        right: "240px",
      }}
    >
      <button
        id="engine-button"
        style={{
          display: "block",
          backgroundColor: "black",
          width: "100px",
          height: "100px",
          borderRadius: "100rem",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      ></button>
      {menuOpen && (
        <div id="engine-menu">
          <Menu />
        </div>
      )}
    </div>
  );
};

const Menu = () => {
  return (
    <div
      style={{
        display: "block",
        width: "200px",
        height: "600px",
        backgroundColor: "grey",
        border: "1px solid #777",
      }}
    ></div>
  );
};
