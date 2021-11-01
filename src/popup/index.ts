import {
  getDomainStatus,
  sendBlockDomainMessage,
  sendAllowDomainMessage,
} from '../utils/domain';

import './index.css';

function init() {
  getDomainStatus((isAllowed) => {
    const buttonAllow = document.getElementById(
      'btn-allow'
    ) as HTMLButtonElement;
    const buttonBlock = document.getElementById(
      'btn-block'
    ) as HTMLButtonElement;

    buttonAllow.disabled = isAllowed;
    buttonBlock.disabled = !isAllowed;

    buttonAllow.addEventListener('click', () => {
      buttonAllow.disabled = true;

      sendAllowDomainMessage(() => {
        buttonBlock.disabled = false;
      });
    });

    buttonBlock.addEventListener('click', () => {
      buttonBlock.disabled = true;

      sendBlockDomainMessage(() => {
        buttonAllow.disabled = false;
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function domListener() {
  init();

  document.removeEventListener('DOMContentLoaded', domListener);
});
