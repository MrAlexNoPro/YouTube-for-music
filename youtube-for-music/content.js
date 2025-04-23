let isEnabled = true;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggle") {
    isEnabled = request.enabled;
    applyEffects();
  }
  sendResponse({ status: "done" });
});

function applyEffects() {
  const video = document.querySelector("video");
  if (!video) return;

  if (isEnabled) {
    // Скрываем видео (оставляем звук)
    video.style.opacity = "0";
    video.style.position = "fixed";
    video.style.top = "-9999px";
    // Отключаем автопаузу
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && video.paused) video.play();
    });
  } else {
    // Возвращаем всё как было
    video.style.opacity = "";
    video.style.position = "";
    video.style.top = "";
  }
}

// Применяем эффекты при загрузке страницы
applyEffects();