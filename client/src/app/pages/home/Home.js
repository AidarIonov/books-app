import { deleteDialog, showError } from '../../../shared/lib/alerts';
import { ModalBookCreate } from '../../components/ui/modal-create';
import { ModalAbout } from '../../components/ui/modal-about';
import { modal } from '../../components/ui/modal/modal';
import { booksService } from '../../service/books.service';
import { getUserOrRedirect } from '../../utils/getUserOrRedirect';
import { redirect } from '../../utils/redirect';
import './home.scss';
import { errorCatch } from '../../utils/errorCatch';
import { BookCard } from './BookCard';
import { layout } from '../../components/ui/modal-about/ui';

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
    const modalTriggers = document.querySelectorAll('[data-modal]');
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
      booksContainer.innerHTML = books.map((book) => BookCard(book)).join('');
    };

    try {
      await renderBooks();
      const btns = document.querySelectorAll('.books-item__btn');
      btns.forEach((btn) => {
        btn.addEventListener('click', async () => {
          const id = btn.getAttribute('data-id');
          const { data: bookInfo } = await booksService.getById(id);
          // await ModalAbout.open(id, onDeleteBook, onCardFavoriteToggle);
          modal.initialize(layout(bookInfo));
          modalTrashBtnHandler(bookInfo);
          modalFavoriteBtnHandler(bookInfo);
        });
      });
    } catch (err) {
      showError('Oops, something went wrong');
    }

    const modalTrashBtnHandler = (book) => {
      const trashBtn = document.querySelector('#btn-trash-modal');
      trashBtn.addEventListener('click', () => {
        onDeleteBook(book);
      });
    };

    const modalFavoriteBtnHandler = (book) => {
      const favoriteBtn = document.querySelector('#btn-favorite-modal');
      const btnFavoriteIcon = document.getElementById(
        'modal-about-btn-favorite-icon'
      );
      favoriteBtn.addEventListener('click', async() => {
        if (await onCardFavoriteToggle(book)) {
          book.isFavorite = !book.isFavorite;
          btnFavoriteIcon.setAttribute(
            'fill',
            book.isFavorite ? 'red' : 'gray'
          );
        }
      });
    };

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
