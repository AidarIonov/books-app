import { showError } from '../../../../shared/lib/alerts';
import { booksService } from '../../../service/books.service';
import { ModalEdit } from '../modal-edit';
import { layout } from './ui';
import './index.scss';

const open = async (bookId, onDelete, onFavoriteToggle) => {
  try {
    const { data: bookInfo } = await booksService.getById(bookId);
    const domParser = new DOMParser();
    const htmlTemplate = domParser.parseFromString(
      layout(bookInfo),
      'text/html'
    );
    document.body.style.overflow = 'hidden';

    const modalWindow = document.body.appendChild(htmlTemplate.body.firstChild);
    const btnAboutModalClose = document.getElementById('modal-order-close-btn');
    btnAboutModalClose.addEventListener('click', () => {
      modalWindow.remove();
      document.body.style.overflow = '';
    });

    const btnTrash = document.getElementById('btn-trash');
    btnTrash.addEventListener('click', () => {
      btnAboutModalClose.click();
      onDelete(bookInfo);
    })
    
    const btnFavorite = document.getElementById('btn-favorite');
    btnFavorite.addEventListener('click', async () => {
      if (await onFavoriteToggle(bookInfo)) {
        bookInfo.isFavorite = !bookInfo.isFavorite;
        const btnFavoriteIcon = document.getElementById(
          'modal-about-btn-favorite-icon'
        );
        btnFavoriteIcon.setAttribute(
          'fill',
          bookInfo.isFavorite ? 'red' : 'gray'
        );
      }
    });

    const btnEdit = document.getElementById('modal-about-btn-edit');
    btnEdit.addEventListener('click', () => {
      window.removeEventListener('keydown', onKeyDown);
      ModalEdit.open(
        bookInfo,
        () => window.addEventListener('keydown', onKeyDown),
        async () => {
          if (await onDelete(bookInfo)) {
            btnAboutModalClose.click();
            return true;
          }
        }
      );
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        btnAboutModalClose.click();
        window.removeEventListener('keydown', onKeyDown);
      }
    };

    window.addEventListener('keydown', onKeyDown);
  } catch (err) {
    showError(err);
  }
};

export const ModalAbout = {
  open,
};
