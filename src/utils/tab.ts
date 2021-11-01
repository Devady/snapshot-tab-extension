/**
 * Create a new tab with given url
 * @param url - url for the tab
 * @param response - callback to execute
 */
export const createTab = (
  url: string,
  response: (tab: chrome.tabs.Tab) => void
) => {
  return chrome.tabs.create({ url }, function (tab) {
    response(tab);
  });
};
