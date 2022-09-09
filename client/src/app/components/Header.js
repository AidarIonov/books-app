import { getUserOrRedirect } from '../utils/getUserOrRedirect';
import { redirect } from '../utils/redirect';
import './header.scss';
import { logic } from './logic';
const Header = {
  render: async () => {
    return `
        <div class="container header__container">
        <a href="/" class="header__title">Books app</a>
            <div class="header__right">
              <span id='user'></span>
              <button class="btn logout-btn"></button>
            </div>
        </div>
      `;
  },
  after_render: async () => {
    const currentUser = getUserOrRedirect();
    const user = document.getElementById('user');
    const logoutBtn = document.querySelector('.logout-btn');
    if (currentUser) {
      user.textContent = currentUser.username;
      logoutBtn.textContent = 'Logout';
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        redirect('/#/login');
      });
    } else {
      window.location.replace('http://localhost:8081/#/login');
    }
    logic();
  },
};
export default Header;
