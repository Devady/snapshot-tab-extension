function setScreenshotUrl(url: string) {
  const imageEl = document.getElementById('target') as HTMLImageElement;

  imageEl.src = url;
}

chrome.runtime.onMessage.addListener(function listener(message) {
  const {
    data: { screenshotUrl, tabId },
  } = message;

  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (tabId !== tab.id) return;

    setScreenshotUrl(screenshotUrl);

    chrome.runtime.onMessage.removeListener(listener);
  });
});
