import { MessageTypes } from '../types';

function setScreenshotUrl(url: string) {
  const imageEl = document.getElementById('target') as HTMLImageElement;

  imageEl.src = url;
}

const listener = (
  message: MessageTypes,
  _: chrome.runtime.MessageSender,
  sendResponse: () => void
) => {
  switch (message.type) {
    case 'SNAPSHOT::DATA':
      setScreenshotUrl(message.data.screenshotUrl);

      sendResponse();

      chrome.runtime.onMessage.removeListener(listener);

      return true;
  }
};

chrome.runtime.onMessage.addListener(listener);
