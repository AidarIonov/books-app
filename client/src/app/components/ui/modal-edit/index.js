import { showError, showSuccessMsg } from '../../../../shared/lib/alerts';
import { booksService } from '../../../service/books.service';
import { layout } from './ui';
import './index.scss';
import FormValidator, { validateLength } from '../../../utils/FormValidator';
import { errorCatch } from '../../../utils/errorCatch';
let _bookId;

const open = (bookInfo, onClosing, onDelete) => {
  try {
    _bookId = bookInfo.id;
    const domParser = new DOMParser();
    const htmlTemplate = domParser.parseFromString(
      layout(bookInfo),
      'text/html'
    );
    const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);

    const bookForm = new FormValidator('#modal-edit-form', onFormSubmit);
    bookForm.register('#modal-create-field-name', validateLength);
    bookForm.register('#modal-create-field-author', validateLength);

    const btnClose = document.getElementById('modal-edit-btn-close');
    btnClose.onclick = () => {
      modalWindow.remove();
      onClosing?.();
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        btnClose.click();
        window.removeEventListener('keydown', onKeyDown);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    const btnDelete = document.getElementById('modal-edit-btn-remove');
    btnDelete.onclick = async () => {
      if (await onDelete()) btnClose.click();
    };
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
  console.log(formData);

  setTimeout(async () => {
    try {
      await booksService.update(_bookId, formData);
      showSuccessMsg('Success', () => {
        window.location.href = './';
      });
    } catch (err) {
      showError(errorCatch(err));
    }
  }, 80);
};

export const ModalEdit = {
  open,
};
