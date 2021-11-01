import { MessageTypes } from '../types';

const sendSnapshotRuntimeMessage = (
  message: MessageTypes,
  response?: () => void
) => chrome.runtime.sendMessage(message, response);

const sendSnapshotTabMessage = (
  tabId: number,
  message: MessageTypes,
  response?: () => void
) => chrome.tabs.sendMessage(tabId, message, response);

export const sendSnapshotRequest = (response: () => void) =>
  sendSnapshotRuntimeMessage({ type: 'SNAPSHOT::REQUEST' }, response);

export const sendSnapshotData = (
  tabId: number,
  screenshotUrl: string,
  response: () => void
) =>
  sendSnapshotTabMessage(
    tabId,
    {
      type: 'SNAPSHOT::DATA',
      data: {
        screenshotUrl,
      },
    },
    response
  );

export const sendSnapshotAllowDomain = (
  domain: string,
  response: () => void
) => {
  sendSnapshotRuntimeMessage(
    { type: 'SNAPSHOT::ALLOW::DOMAIN', data: { domain } },
    response
  );
};

export const sendSnapshotBlockDomain = (
  domain: string,
  response: () => void
) => {
  sendSnapshotRuntimeMessage(
    { type: 'SNAPSHOT::BLOCK::DOMAIN', data: { domain } },
    response
  );
};

export const messaging = {
  sendSnapshotRequest,
  sendSnapshotData,
  sendSnapshotAllowDomain,
  sendSnapshotBlockDomain,
};

export default messaging;
