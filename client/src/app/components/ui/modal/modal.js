import './modal.scss';
import { showError } from '../../../shared/lib/alerts';
const createModal = (content) => {
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.setAttribute('data-close', '');
  modal.innerHTML = `
    <div class="modal__content">
      <div data-close class="modal__close">X</div>
      ${content}
    </div>`;
  return modal;
};

const initialize = (content) => {
  try {
    const modal = createModal(content);
    modal.querySelector('.modal__content').addEventListener('click', (e) => {
      e.stopPropagation();
    });
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    const modalCloseTriggers = document.querySelectorAll('[data-close]');
    modalCloseTriggers.forEach((btn) => {
      btn.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
      });
    });
  } catch (err) {
    showError(err);
  }
};

export const modal = {
  initialize,
};
