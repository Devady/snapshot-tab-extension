import { MessageTypes } from '../types';
import { allowDomain, blockDomain, getDomainStatus } from '../utils/domain';
import { captureSnapshot } from '../utils/snapshot';

let id = 100;

const listener = (
  message: MessageTypes,
  _: chrome.runtime.MessageSender,
  sendResponse: () => void
) => {
  switch (message.type) {
    case 'SNAPSHOT::REQUEST':
      getDomainStatus((isAllowed) => {
        if (!isAllowed) {
          sendResponse();

          return;
        }

        captureSnapshot(id, sendResponse);
        id++;
      });

      return true;
    case 'SNAPSHOT::ALLOW::DOMAIN':
      allowDomain(message.data.domain, sendResponse);

      return true;
    case 'SNAPSHOT::BLOCK::DOMAIN':
      blockDomain(message.data.domain, sendResponse);

      return true;
  }
};

chrome.runtime.onMessage.addListener(listener);
