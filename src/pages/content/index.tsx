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

  // document.addEventListener("mouseup", () => {
  //   const selectedText = window.getSelection()?.toString();

  //   if (selectedText?.length)
  //     try {
  //       console.log("Sending transmission");

  //       port.postMessage({ text: selectedText });
  //       console.log("Transmission Sent");

  //       !wizardInProgress && root.render(<SelectionMode text={selectedText} />);
  //     } catch (error) {
  //       console.error("Could not send message");
  //       console.error({ error });
  //     }
  // });

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
  const [textSelection, setTextSelection] = useState("");

  // listen for text select when engine has started
  useEffect(() => {
    const handleTextSelect = (event) => {
      const selectedText = window.getSelection()?.toString() ?? "";

      if (selectedText?.length) setTextSelection(selectedText);
    };
    document.addEventListener("mouseup", handleTextSelect);

    return () => document.removeEventListener("mouseup", handleTextSelect);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px",
        right: "240px",
      }}
    >
      {menuOpen && (
        <div id="engine-menu">
          <Menu />
        </div>
      )}
      <button
        id="engine-button"
        style={{
          display: "block",
          width: "100px",
          height: "100px",
          borderRadius: "100rem",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          padding: 0,
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          width={"100%"}
          height={"100%"}
          viewBox="-3.6 -3.6 43.20 43.20"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="iconify iconify--twemoji"
          preserveAspectRatio="xMidYMid meet"
          fill="#000000"
        >
          <g
            id="SVGRepo_bgCarrier"
            stroke-width="0"
            transform="translate(0,0), scale(1)"
          >
            <rect
              x="-3.6"
              y="-3.6"
              width="43.20"
              height="43.20"
              rx="21.6"
              fill="#45AAF2"
              strokewidth="0"
            ></rect>
          </g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="#CCCCCC"
            stroke-width="0.072"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              fill="#AD743D"
              d="M35.432 22.773c-.195.858-.638 1.773-1.022 2.159c1.399-4.418 1.399-9.111-2.25-11.167c.112 1.107-.11 1.691-.265 2.153c-.21-2.219-.578-3.744-2.158-4.927c-1.82-1.363-2.611-.452-.736 3.765c2.2 4.945 1.475 8.603.827 11.216c-.038.154-.08.29-.12.439c.804-5.765-.989-11.722-6.825-14.915c-2.989-1.636-5.211-1.852-5.329-3.037c-.135-1.377-1.218-3.698-3.811-5.327c.444-1.309-.485-2.787-1.117-2.841c-.631-.054-2.024 1.039-2.16 2.528c-4.694 1.399-9.492 7.219-9.345 8.397c.148 1.177.341 2.638 6.57 3.656c1.104.18 3.995 1.835 4.4 5.779c.456 4.44 2.276 8.054 4.712 11.216h-1.73c-4.132 0-4.132 4.132-1.377 4.132h10.928l-.002-.002c.36-.003.788-.029 1.304-.085c6.931-.612 10.792-7.349 9.506-13.139z"
            ></path>
            <path
              fill="#D99E82"
              d="M11.325 15.279c3.258-.09 4.524-6.049-.682-6.82c-.122-1.077-.763-2.614-2.257-2.724c-2.348-.173-5.294 2.116-6.099 7.478c.881.601 2.467 1.18 5.405 1.661c1.104.18 3.995 1.835 4.4 5.779c.531 5.174 2.914 9.224 5.966 12.747c.903-.94 1.636-2.325 2.028-4.285c1.378-6.886-7.384-12.458-8.761-13.836z"
            ></path>
            <circle fill="#292F33" cx="7.692" cy="9.459" r="1.377"></circle>
            <path
              fill="#662113"
              d="M21.254 13.564c4.065 3.341 6.158 7.296 5.402 12.37c-.318 2.143.83 2.933 1.688.902c.599-1.423.936-9.887-6.05-14.311c-1.859-1.177-1.961.284-1.04 1.039z"
            ></path>
            <path
              fill="#AD743D"
              d="M13.234 19.676c-1.243-1.243-4.97 0-6.211-2.488c-.786-1.572-3.728 1.245-2.485 3.734c1.242 2.483 4.969 2.483 7.454 1.242c2.485-1.242 1.242-2.488 1.242-2.488z"
            ></path>
            <path
              fill="#662113"
              d="M6.26 20.146c.304 1.49-.383 4.295-1.874 4.6c-1.49.304-3.22-2.007-3.524-3.496a2.76 2.76 0 0 1 2.147-3.253a2.756 2.756 0 0 1 3.251 2.149z"
            ></path>
            <path
              fill="#AD743D"
              d="M13.907 21.375c-1.635-1.062-5.388 1.148-7.309-1.259c-1.215-1.523-3.753 2.209-1.832 4.615c1.921 2.405 5.962 1.543 8.368-.378c2.407-1.92.773-2.978.773-2.978z"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

const Menu = () => {
  return (
    <div
      style={{
        display: "block",
        position: "relative",
        width: "200px",
        height: "600px",
        backgroundColor: "grey",
        border: "1px solid #777",
      }}
    >
      <h1>Menu</h1>
      <ul>
        <li>
          <button>Create Label</button>
        </li>
        <li>
          <button onClick={() => console.log("start wizard")}>
            Use Wizard
          </button>
        </li>
        <li>
          <button>Settings</button>
        </li>
        <li>
          <button>Void label</button>
        </li>
      </ul>
    </div>
  );
};
