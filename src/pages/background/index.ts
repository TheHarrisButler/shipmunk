console.log("background script loaded");

// listen for clicks on the extension icon
chrome.action.onClicked.addListener(async (res) => {
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  if (!tab.id) throw new Error("Could not find active tab");
  void chrome.tabs.sendMessage(tab.id, {
    active: true,
  });
});
