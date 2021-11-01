import { sendSnapshotAllowDomain, sendSnapshotBlockDomain } from '../messaging';

/**
 * Get the domain status of current tab and executes the `response` with the param `isAllowed`
 * @param response - callback to execute
 */
export const getDomainStatus = (response: (isAllowed: boolean) => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]) => {
    const { hostname } = new URL(url!);

    chrome.storage.local.get(
      { snapshotDomainsNotAllowed: [] },
      ({ snapshotDomainsNotAllowed }) => {
        if (snapshotDomainsNotAllowed.includes(hostname)) {
          response(false);

          return;
        }

        response(true);
      }
    );
  });
};

/**
 * Sends the message to block the domain of current tab
 * @param response - callback to execute
 */
export const sendBlockDomainMessage = (response: () => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]) => {
    const { hostname } = new URL(url!);

    sendSnapshotBlockDomain(hostname, () => {
      response();
    });
  });
};

/**
 * Sends the message to allow the domain of current tab
 * @param response - callback to execute
 */
export const sendAllowDomainMessage = (response: () => void) => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([{ url }]) => {
    const { hostname } = new URL(url!);

    sendSnapshotAllowDomain(hostname, () => {
      response();
    });
  });
};

/**
 * Allows the domain to snapshot from
 * @param domain - domain to allow
 * @param response - callback to execute
 */
export const allowDomain = (domain: string, response: () => void) => {
  chrome.storage.local.get(
    { snapshotDomainsNotAllowed: [] },
    ({ snapshotDomainsNotAllowed }) => {
      if (!snapshotDomainsNotAllowed.includes(domain)) {
        response();

        return;
      }

      chrome.storage.local.set(
        {
          snapshotDomainsNotAllowed: snapshotDomainsNotAllowed.filter(
            (domainNotAllowed: string) => domainNotAllowed !== domain
          ),
        },
        () => {
          response();
        }
      );
    }
  );
};

/**
 * Blocks the domain to not snapshot from
 * @param domain - domain to allow
 * @param response - callback to execute
 */
export const blockDomain = (domain: string, response: () => void) => {
  chrome.storage.local.get(
    { snapshotDomainsNotAllowed: [] },
    ({ snapshotDomainsNotAllowed }) => {
      if (snapshotDomainsNotAllowed.includes(domain)) {
        response();

        return;
      }

      chrome.storage.local.set(
        { snapshotDomainsNotAllowed: [...snapshotDomainsNotAllowed, domain] },
        () => {
          response();
        }
      );
    }
  );
};
