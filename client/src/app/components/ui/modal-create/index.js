import { showError, showSuccessMsg } from '../../../../shared/lib/alerts';
import { layout } from './ui';
import FormValidator, { validateLength } from '../../../utils/FormValidator';
import { booksService } from '../../../service/books.service';
import './index.scss';
import { errorCatch } from '../../../utils/errorCatch';

const open = () => {
  try {
    const domParser = new DOMParser();
    const htmlTemplate = domParser.parseFromString(layout(), 'text/html');
    const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);
    document.body.style.overflow = 'hidden'
    const bookForm = new FormValidator('#modal-create-form', onFormSubmit);
    bookForm.register('#modal-create-field-name', validateLength);
    bookForm.register('#modal-create-field-author', validateLength);

    const btnClose = document.getElementById('modal-create-btn-close');
    btnClose.addEventListener('click', () => {
      modalWindow.remove();
      document.body.style.overflow = ''
    })

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        btnClose.click();
        window.removeEventListener('keydown', onKeyDown);
      }
    };

    window.addEventListener('keydown', onKeyDown);
  } catch (err) {
    showError(err);
  }
};

const onFormSubmit = (_, event) => {
  const rawFormData = Object.fromEntries(new FormData(event.target));
  const formData = {
    ...rawFormData,
    publishYear: Number(rawFormData.publishYear),
    pagesNumber: Number(rawFormData.pagesNumber),
    genres: rawFormData.genres.split().map((x) => x.trim()),
  };

  setTimeout(async () => {
    try {
      if (formData) {
        await booksService.create(formData);
        showSuccessMsg('Success', () => {
          window.location.href = './';
        });
      }
    } catch (err) {
      showError(errorCatch(err));
    }
  }, 80);
};

export const ModalBookCreate = {
  open,
};
