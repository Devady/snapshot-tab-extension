import { ISnapshotRequest } from '../../types';

const sendSnapshotRequest = () =>
  chrome.runtime.sendMessage({ type: 'SNAPSHOT::REQUEST' } as ISnapshotRequest);

export const Button = (): HTMLButtonElement => {
  const buttonEl = document.createElement('button');

  buttonEl.innerText = 'S';
  buttonEl.classList.add('snap-btn');

  buttonEl.addEventListener('click', sendSnapshotRequest);

  return buttonEl;
};

export default Button;
