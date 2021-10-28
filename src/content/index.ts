import './index.css';

import { ISnapshotRequest } from '../types';

function createButton(): HTMLButtonElement {
  const buttonEl = document.createElement('button');

  buttonEl.innerText = 'S';
  buttonEl.classList.add('snap-btn');

  buttonEl.addEventListener('click', () => {
    chrome.runtime.sendMessage({
      type: 'SNAPSHOT::REQUEST',
    } as ISnapshotRequest);
  });

  return buttonEl;
}

const button = createButton();

document.body.appendChild(button);
