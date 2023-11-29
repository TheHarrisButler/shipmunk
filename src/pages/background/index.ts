console.log("background script loaded");

// listen for clicks on the extension icon
chrome.action.onClicked.addListener((res) => {
  console.log("icon clicked");
  console.log({ res });
});

// selection communication
chrome.runtime.onConnect.addListener((port) => {
  console.log("Awaiting Transmissions");

  port.onMessage.addListener((msg) => {
    console.log("Transmission Received");
    console.log({ msg });
  });
});

// wizard communication
const wizardComms = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  if (!tab.id) throw new Error("Could not find active tab");
  void chrome.tabs.sendMessage(tab.id, {
    wizard: true,
  });
};

// this catches the wizard initiation
chrome.runtime.onMessage.addListener((request, sender, sentdResponse) => {
  // talk to the content
  void wizardComms();
});
