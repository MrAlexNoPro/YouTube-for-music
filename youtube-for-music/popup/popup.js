document.getElementById("toggle-btn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "toggle" }, (response) => {
      const button = document.getElementById("toggle-btn");
      button.textContent = response.enabled ? "Выключить" : "Включить";
    });
  });
  
  // Проверяем состояние при открытии попапа
  chrome.runtime.sendMessage({ action: "getStatus" }, (response) => {
    const button = document.getElementById("toggle-btn");
    button.textContent = response.enabled ? "Выключить" : "Включить";
  });