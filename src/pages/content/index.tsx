import { createRoot } from "react-dom/client";
import { Content } from "./content";
const div = document.createElement("div");
div.id = "__root";
document.body.appendChild(div);

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Options root element");
const root = createRoot(rootContainer);

// constanct comms for selected text

try {
  console.log("content script loaded");

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // if the user clicked on the extension icon display the bottom left button
    if (request.active) root.render(<Content />);
  });
} catch (e) {
  console.error(e);
}
