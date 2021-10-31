import { MessageTypes } from '../types';

let id = 100;

chrome.runtime.onMessage.addListener((message: MessageTypes) => {
  switch (message.type) {
    case 'SNAPSHOT::REQUEST':
      console.log({ message });

      chrome.tabs.captureVisibleTab(function (screenshotUrl) {
        const viewTabUrl = chrome.extension.getURL('preview.html?id=' + id++);

        let targetId: number | null | undefined = null;

        console.log({ viewTabUrl });

        chrome.tabs.onUpdated.addListener(function listener(
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
          chrome.tabs.onUpdated.removeListener(listener);

          console.log('sending message');

          chrome.runtime.sendMessage({
            type: 'SNAPSHOT::SRC',
            data: {
              screenshotUrl,
              tabId,
            },
          });

          // Look through all views to find the window which will display
          // the screenshot.  The url of the tab which will display the
          // screenshot includes a query parameter with a unique id, which
          // ensures that exactly one view will have the matching URL.
          // var views = chrome.extension.getViews();
          // for (var i = 0; i < views.length; i++) {
          //   var view = views[i];
          //   if (view.location.href == viewTabUrl) {
          //     // (view as any).setScreenshotUrl(screenshotUrl);
          //     break;
          //   }
          // }
        });

        chrome.tabs.create({ url: viewTabUrl }, function (tab) {
          targetId = tab.id;
        });
      });

      return;
    case 'SNAPSHOT::SRC::REQUEST':
      console.log('src src request background');
      console.log(message.data);
      return;
  }
});
