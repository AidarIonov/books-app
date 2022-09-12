import { showError, showSuccessMsg } from '../../../../shared/lib/alerts';
import { errorCatch } from '../../../utils/errorCatch';
import { layout } from './ui';
import './index.scss';
import FormValidator, { validateLength } from '../../../utils/FormValidator';

const open = () => {
  try {
    const domParser = new DOMParser();
    const htmlTemplate = domParser.parseFromString(layout(), 'text/html');
    const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);

    const bookForm = new FormValidator('#modal-create-form', onFormSubmit);
    bookForm.register('#modal-create-field-name', validateLength)
    bookForm.register('#modal-create-field-author', validateLength)

    const btnClose = document.getElementById('modal-create-btn-close');
    btnClose.onclick = () => {
      modalWindow.remove();
    };

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

const onFormSubmit = (data, event) => {
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
        // await Api.addBook(formData);
        showSuccessMsg('Success', () => {
          window.location.href = './';
        });
      }
    } catch (err) {
      showError(err);
    }
  }, 80);
};

const fieldsElements = () => ({
  name: {
    input: document.getElementById('modal-create-field-name'),
    errLabel: document.getElementById('modal-create-field-name-err'),
  },
  author: {
    input: document.getElementById('modal-create-field-author'),
    errLabel: document.getElementById('modal-create-field-author-err'),
  },
});

const clearErrors = () => {
  for (const field of Object.values(fieldsElements())) {
    field.input.classList.remove('input_error');
    field.errLabel.textContent = '';
  }
};

const validate = (data) => {
  let result = true;

  const elements = fieldsElements();

  if (!data.name) {
    elements.name.errLabel.textContent = 'Field is required';
    elements.name.input.classList.add('input_error');
    result = false;
  }

  if (!data.author) {
    elements.author.errLabel.textContent = 'Field is required';
    elements.author.input.classList.add('input_error');
    result = false;
  }

  return result;
};

export const ModalBookCreate = {
  open,
};
