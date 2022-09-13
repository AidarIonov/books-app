import { showError, showSuccessMsg } from '../../../shared/lib/alerts';
import { booksService } from '../../../service/books.service';
import { errorCatch } from '../../../utils/errorCatch';
import FormValidator, { validateLength } from '../../../utils/FormValidator';
import { modal } from '../modal/modal';
import { layoutEdit } from './ui';

export const editBookHandler = (book) => {
  const btnEdit = document.getElementById('modal-about-btn-edit');
  btnEdit.addEventListener('click', () => {
    modal.initialize(layoutEdit(book));
    const bookForm = new FormValidator(
      '#modal-edit-form',
      handleEditSubmit,
      book.id
    );
    bookForm.register('#modal-create-field-name', validateLength);
    bookForm.register('#modal-create-field-author', validateLength);
  });
};

export const handleEditSubmit = (_, event, bookId) => {
  const rawFormData = Object.fromEntries(new FormData(event.target));
  const formData = {
    ...rawFormData,
    publishYear: Number(rawFormData.publishYear),
    pagesNumber: Number(rawFormData.pagesNumber),
    genres: rawFormData.genres.split().map((x) => x.trim()),
  };

  setTimeout(async () => {
    try {
      await booksService.update(bookId, formData);
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
