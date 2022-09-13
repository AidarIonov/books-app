import { showError } from '../../shared/lib/alerts';
import { onCreateBookSubmit } from '../../components/ui/modal-create';
import { modal } from '../../components/ui/modal/modal';
import { booksService } from '../../service/books.service';
import { getUser } from '../../utils/getUser';
import { redirect } from '../../utils/redirect';
import { BookCard } from './BookCard';
import { layout } from '../../components/ui/modal-about/ui';
import FormValidator, { validateLength } from '../../utils/FormValidator';
import { editBookHandler } from '../../components/ui/modal-edit';
import { layoutCreate } from '../../components/ui/modal-create/ui';
import {
  modalFavoriteBtnHandler,
  modalTrashBtnHandler,
} from '../../components/ui/modal-about';

import './home.scss';

const Home = {
  render: async () => `
    <div class="wrapper">
      <div class="container">
      <div class="books"></div>
      <button class="btn books__btn">Add a book</button>
      </div>
    </div>
  `,

  after_render: async () => {
    const booksContainer = document.querySelector('.books');
    const currentUser = getUser();

    if (!currentUser) {
      redirect('/#/login');
    }
    const renderBooks = async () => {
      const { data: books } = await booksService.getAll();
      if (!books.length) {
        const element = document.createElement('h2');
        element.textContent = 'Books not found:(';
        booksContainer.append(element);
      }
      booksContainer.innerHTML = books.map((book) => BookCard(book)).join('');
    };

    try {
      await renderBooks();
      const btns = document.querySelectorAll('.books-item__btn');
      btns.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-id');
          const { data: singleBook } = await booksService.getById(id);
          modal.initialize(layout(singleBook));
          modalTrashBtnHandler(singleBook);
          modalFavoriteBtnHandler(singleBook);
          editBookHandler(singleBook);
        });
      });
    } catch (err) {
      showError('Oops, something went wrong');
    }
    const btnAddBook = document.querySelector('.books__btn');
    btnAddBook.addEventListener('click', () => {
      modal.initialize(layoutCreate());
      const bookForm = new FormValidator(
        '#modal-create-form',
        onCreateBookSubmit
      );
      bookForm.register('#modal-create-field-name', validateLength);
      bookForm.register('#modal-create-field-author', validateLength);
    });
  },
};

export default Home;
