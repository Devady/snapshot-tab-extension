import { sendSnapshotRequest } from '../../messaging';

import './button.css';

const CLASS_BUTTON = 'snap-btn';
const CLASS_HIDDEN = 'is-hidden';

export const Button = (): HTMLButtonElement => {
  const buttonEl = document.createElement('button');

  buttonEl.innerText = 'S';
  buttonEl.classList.add(CLASS_BUTTON);

  buttonEl.addEventListener('click', () => {
    requestAnimationFrame(() => {
      buttonEl.classList.add(CLASS_HIDDEN);

      sendSnapshotRequest(() => {
        requestAnimationFrame(() => {
          buttonEl.classList.remove(CLASS_HIDDEN);
        });
      });
    });
  });

  return buttonEl;
};

export default Button;
