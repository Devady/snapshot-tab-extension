import { sendSnapshotData } from '../messaging';
import { MessageTypes } from '../types';

let id = 100;

const createTab = (url: string, response: (tab: chrome.tabs.Tab) => void) => {
  return chrome.tabs.create({ url }, function (tab) {
    response(tab);
  });
};

const captureSnapshot = (response: () => void) => {
  return chrome.tabs.captureVisibleTab((screenshotUrl) => {
    const viewTabUrl = chrome.extension.getURL('preview.html?id=' + id++);

    let targetId: number | null | undefined = null;

    chrome.tabs.onUpdated.addListener(function listenerTab(
      tabId,
      changedProps
    ) {
      // We are waiting for the tab we opened to finish loading.
      // Check that the tab's id matches the tab we opened,
      // and that the tab is done loading.
      if (tabId != targetId || changedProps.status != 'complete') return;

      // Passing the above test means this is the event we were waiting for.
      // There is nothing we need to do for future onUpdated events, so we
      // use removeListner to stop getting called when onUpdated events fire.
      chrome.tabs.onUpdated.removeListener(listenerTab);

      // Once the tab is completed we send the image info
      sendSnapshotData(tabId, screenshotUrl, () => {
        response();
      });
    });

    createTab(viewTabUrl, (tab) => {
      targetId = tab.id;
    });
  });
};

const listener = (
  message: MessageTypes,
  _: chrome.runtime.MessageSender,
  sendResponse: () => void
) => {
  switch (message.type) {
    case 'SNAPSHOT::REQUEST':
      captureSnapshot(sendResponse);

      return true;
  }
};

chrome.runtime.onMessage.addListener(listener);
