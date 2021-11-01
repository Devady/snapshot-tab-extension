import { sendSnapshotData } from '../messaging';
import { createTab } from './tab';

/**
 * Captures a snapshot of the current tab
 * @param response - Callback to execute
 */
export const captureSnapshot = (id: number, response: () => void) => {
  return chrome.tabs.captureVisibleTab((screenshotUrl) => {
    const viewTabUrl = chrome.extension.getURL('preview.html?id=' + id);

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
