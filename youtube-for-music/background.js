let isEnabled = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    isEnabled = !isEnabled;
    chrome.browserAction.setIcon({
      path: isEnabled ? "icons/icon.png" : "icons/icon_off.png"
    });
    chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, { action: "toggle", enabled: isEnabled });
      });
    });
  }
  sendResponse({ enabled: isEnabled });
});