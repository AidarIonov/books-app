import { deleteDialog, showError } from '../../../shared/lib/alerts';
import { ModalBookCreate } from '../../components/ui/modal-create';
import { ModalAbout } from '../../components/ui/modal-about';
import { booksService } from '../../service/books.service';
import { getUserOrRedirect } from '../../utils/getUserOrRedirect';
import { redirect } from '../../utils/redirect';
import './home.scss';
import { errorCatch } from '../../utils/errorCatch';

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
    const currentUser = getUserOrRedirect();
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
      booksContainer.innerHTML = books
        .map(
          (book) => `
        <div class='books__item' id='${book.id}'>
            <h3>${book.author}</h3>
            <p>${book.name}</p>
            <img data-id='${book.id}' class="books__item-edit" src="/assets/img/pencil.svg" alt="Pencil" />
          <button class="btn books-item__btn" data-id="${book.id}">Read more</button>
        </div>
      `
        )
        .join('');
    };
    try {
      await renderBooks();
      const btns = document.querySelectorAll('.books-item__btn');
      btns.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-id');
          await ModalAbout.open(id, onDeleteBook, onCardFavoriteToggle);
        });
      });
    } catch (err) {
      showError('Oops, something went wrong');
    }
    const onDeleteBook = async (book) => {
      let result = false;
      await deleteDialog(async () => {
        await booksService.delete(book.id);
        const bookCard = document.getElementById(book.id);
        bookCard.remove();
        result = true;
      });

      return result;
    };
    const onCardFavoriteToggle = async (bookInfoBeforeCommit) => {
      try {
        await booksService.update(bookInfoBeforeCommit.id, {
          isFavorite: !bookInfoBeforeCommit.isFavorite,
        });
        return true;
      } catch (err) {
        showError(errorCatch(err));
        return false;
      }
    };
    const btnAddBook = document.querySelector('.books__btn');
    btnAddBook.addEventListener('click', () => {
      ModalBookCreate.open();
    });
  },
};

export default Home;
