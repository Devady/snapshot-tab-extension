import { MessageTypes } from '../types';

chrome.runtime.onMessage.addListener((message: MessageTypes) => {
  switch (message.type) {
    case 'SNAPSHOT::REQUEST':
      console.log({ message });
      return;
  }
});
