import { showError } from '../../../shared/lib/alerts';
import { booksService } from '../../service/books.service';
import { getUserOrRedirect } from '../../utils/getUserOrRedirect';
import { redirect } from '../../utils/redirect';
import './home.scss';

const Home = {
  render: async () => `
    <div class="wrapper">
      <div class="container">
      <button class="btn books__btn">Add a book</button>
        <div class="books"></div>
      </div>
    </div>
  `,

  after_render: async () => {
    const booksContainer = document.querySelector('.books');
    const currentUser = getUserOrRedirect();
    if (!currentUser) {
      redirect('/#/login');
    }
    try {
      const { data: books } = await booksService.getAll();
      if (!books.length) {
        const element = document.createElement('h2');
        element.textContent = 'Books not found:(';
        booksContainer.append(element);
      }
      booksContainer.innerHTML = books.map(
        (book) => `
        <div class='books__item'>
            <h3>${book.author}</h3>
            <p>${book.name}</p>
          <button class="btn books-item__btn" data-id="${book.id}">Read more</button>
        </div>
      `
      ).join('');
      const btns = document.querySelectorAll('.books-item__btn');
      btns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          console.log(id);
        });
      });
    } catch (err) {
      showError('Oops, something went wrong');
    }
  },
};

export default Home;
